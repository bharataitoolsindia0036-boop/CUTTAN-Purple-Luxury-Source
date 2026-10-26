import { Input, Output, BlobSource, ALL_FORMATS, Mp4OutputFormat, BufferTarget, CanvasSource, VideoSampleSink } from 'mediabunny';

const R1080: any = { '9:16': [1080, 1920], '16:9': [1920, 1080], '1:1': [1080, 1080], '4:5': [864, 1080] };
const R720: any = { '9:16': [720, 1280], '16:9': [1280, 720], '1:1': [720, 720], '4:5': [576, 720] };
const CSS: any = { 'Original':'none', 'Purple Dream':'saturate(1.18) hue-rotate(14deg) contrast(1.06)', 'Cinematic':'contrast(1.15) saturate(1.12)', 'Mono':'grayscale(1)', 'Vivid':'saturate(1.65) contrast(1.08)' };

export async function fastExport(file: File, opts: any, onProgress: (p:number)=>void) {
  onProgress(5);
  const R = opts.quality === '720p' ? R720 : R1080;
  const tw = R[opts.ratio]?.[0] || 1080;
  const th = R[opts.ratio]?.[1] || 1920;

  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const track = await input.getPrimaryVideoTrack();
  if (!track) throw new Error('No video');
  
  const fullDur = await track.computeDuration();
  const startSec = fullDur * opts.trimStart / 100;
  const endSec = fullDur * opts.trimEnd / 100;
  const trimmedDur = Math.max(0.1, (endSec - startSec) / opts.speed);

  const canvas = new OffscreenCanvas(tw, th);
  const ctx: any = canvas.getContext('2d', { alpha: false });
  const sink = new VideoSampleSink(track);
  const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
  const src = new CanvasSource(canvas, { codec: 'avc', bitrate: opts.quality === '720p' ? 1500000 : 3000000 } as any);
  output.addVideoTrack(src, { frameRate: 30 });
  await output.start();
  onProgress(15);

  let c = 0;
  for await (const sample of sink.samples(startSec, endSec)) {
    const elapsed = (sample.timestamp - startSec) / opts.speed;
    if (c % 5 === 0) {
      onProgress(15 + Math.min(80, Math.round((elapsed / trimmedDur) * 80)));
    }
    ctx.save();
    ctx.clearRect(0, 0, tw, th);
    ctx.filter = CSS[opts.filter] || 'none';
    if (opts.rotation) {
      ctx.translate(tw/2, th/2);
      ctx.rotate(opts.rotation * Math.PI / 180);
      ctx.translate(-tw/2, -th/2);
    }
    const scale = opts.crop === 'fill' ? Math.max(tw / sample.codedWidth, th / sample.codedHeight) : Math.min(tw / sample.codedWidth, th / sample.codedHeight);
    const dw = sample.codedWidth * scale;
    const dh = sample.codedHeight * scale;
    ctx.drawImage(sample, (tw - dw)/2, (th - dh)/2, dw, dh);
    ctx.restore();
    await src.add(elapsed, 1/30);
    sample.close();
    c++;
  }
  await output.finalize();
  onProgress(100);
  const buf = (output.target as any).buffer;
  return new Blob([buf], { type: 'video/mp4' });
}

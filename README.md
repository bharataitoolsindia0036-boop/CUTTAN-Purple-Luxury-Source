# CUTTAN — Purple Luxury Video LUT Studio

A source-included, mobile-first React + TypeScript + Vite editor starter. This package is intentionally honest about its scope: it provides single-clip import/preview and a real FFmpeg.wasm render path for trim, aspect-ratio fill/fit, rotation, playback speed, colour presets, and optional replacement audio. It is **not** a completed 10-track editor and is **not** an Indus Appstore approval guarantee.

## Current implemented scope

- Local video selection and browser preview (250 MB input cap; browser/device codecs still apply).
- Purple luxury responsive UI, Home / Editor / Projects / Settings navigation.
- Nine preview colour presets; matching FFmpeg filter strings for export.
- Trim percentage, 9:16 / 16:9 / 1:1 / 4:5 output ratios, fill/fit, 0/90/180/270 degree rotation, 0.25×–2× speed.
- Optional replacement audio input. It replaces original audio; it is **not mixed** with source audio.
- FFmpeg.wasm render to MP4 with progress, output-size check, error handling, temporary-file cleanup.
- Exportable `.cuttan.json` project settings and restore of settings. Source media must be reselected; media itself is not saved in that JSON.
- No third-party stock photos, bundled music, commercial LUT packs, external logos, payments or ad SDKs.

## Not implemented (do not advertise as available)

- Ten simultaneous rendered layers; overlay video compositing; audio mixing; SFX/voiceover timeline mixing; text/sticker burn-in; transitions; split/merge; undo/redo; drag/reorder timeline; autosave of original media; cloud sync; account/subscription/coins; AI/background removal; 4K export guarantee; native Android packaging/signing.
- This project does not include a native APK/AAB. A source ZIP is not an Android store upload file.

## Included project files

See `PROJECT_FILES.md` for the full file-by-file map. The source includes `src/`, `public/`, `index.html`, `manifest.webmanifest`, PWA service worker/offline page, original icons, Vite/TypeScript config, Capacitor config, scripts, privacy/licence documents and store-release checklist. The generated native Android Gradle project and signed APK/AAB are not included; see `ANDROID_BUILD.md`.

## Build on a computer or supported terminal

Use Node.js 20+ and npm. Internet is required once to download packages. FFmpeg core is copied into `public/ffmpeg` during build and adds a sizeable WASM payload to the production build.

```bash
npm install
npm run typecheck
npm run build
npm run preview
```

For Android packaging, follow `ANDROID_BUILD.md`; run `npx cap add android` once after dependencies are installed, then `npx cap sync android`.

Open the local Vite URL on the same device. For Android browser testing, serve over HTTPS or use the development host on a trusted network. Video rendering is memory-intensive; test short clips first. If build fails, preserve the complete terminal log before troubleshooting.

## Data handling

The selected video/audio is processed in the browser using object URLs and FFmpeg.wasm; this source contains no upload endpoint or analytics SDK. The FFmpeg engine is bundled by the build script. Hosting providers still receive normal web request metadata. Review your final deployment and any added dependencies before making privacy claims.

## Branding and rights

CUTTAN name/logo assets authored in this package are original project assets; this does not constitute trademark clearance. Search for conflicting marks before commercial publication. Do not use third-party songs, fonts, photos, stickers, LUTs or logos unless you have documented permission or a compatible licence. Keep all dependency notices and licence files with distributed builds.

See `LICENSES.md`, `PRIVACY_POLICY.md`, and `INDUS_RELEASE_CHECKLIST.md`.

# CUTTAN source audit report

Audit date: 25 October 2026

## Inputs examined

- `CUTTAN-STUDIO-FINAL.zip` from the user's Library.
- `CUTTAN_src_App.tsx` from the user's Library.
- The latest code pasted in the conversation.

## Prior package findings

The previous ZIP contained a `dist/` build, manifest, service-worker files, and one minified JS asset, but did not contain the editable `src/App.tsx`, `src/main.tsx`, `package.json`, Vite config, or README. The source excerpt itself explicitly reported export as unavailable. Its preview controls should not be represented as a finished video editor.

## Repair package contents

- Fresh React + TypeScript + Vite project structure.
- Mobile-first OLED dark / purple luxury UI.
- Browser-local video import and preview, nine colour presets, trim percentage, output ratio, fit/fill, rotation, speed, optional replacement audio.
- FFmpeg.wasm MP4 rendering path, progress display, non-empty output check, and error feedback.
- Project-settings JSON export/import and recent project-name list.
- PWA manifest and original CUTTAN SVG/PNG icons.
- Privacy draft, licence register, release checklist, and scope disclosure.

## Verification performed in this environment

- JSON parsing passed for `package.json`, TypeScript configs, and PWA manifest.
- TypeScript/TSX transpile syntax check passed for `src/App.tsx`, `src/main.tsx`, `src/vite-env.d.ts`, and `vite.config.ts`.
- `node --check scripts/copy-ffmpeg.mjs` passed.
- A full TypeScript typecheck/build could not be completed because dependencies are not installed and npm registry access timed out in this environment.
- No Android emulator or physical Android device test was available.
- FFmpeg runtime rendering was not executed here.

## Known blockers / limitations

- Not an APK/AAB; no native Android wrapper, package ID, signing configuration, or target SDK is included.
- The requested 10-layer compositing timeline is not implemented. This version edits and renders one video clip plus optional replacement audio.
- Text/stickers are not burned into export; audio is replaced rather than mixed; no merge, transition, voiceover mixing, undo/redo, or media autosave.
- Project JSON saves edit settings only. The original video/audio must be reselected.
- Exact FFmpeg core build and codec licence notices must be checked after installing dependencies.
- App name/logo trademark clearance has not been performed.

## Release status

**Source ZIP prepared; not store-ready/certified.** Do not submit as an Android app binary. Run clean install/build/typecheck, test real rendering on target Android devices, complete native packaging, verify licences and trademark availability, publish the final privacy policy, and follow the current Indus publisher portal instructions.

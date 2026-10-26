# Android packaging with Capacitor

The repository contains the web app and Capacitor configuration, but the generated native `android/` platform is intentionally not checked into this source ZIP. Generate it with the matching Capacitor CLI after installing dependencies.

Requirements: Node.js 20+, npm, Android Studio, Android SDK and a Java version supported by the installed Android Gradle Plugin.

```bash
npm install
npm run typecheck
npm run build
npx cap add android       # run once only
npx cap sync android
npx cap open android
```

In Android Studio, select a real device or emulator and test import, preview, export, app pause/resume, storage pressure and back navigation. Create a signed release AAB/APK from Android Studio after verifying the current Indus Appstore requirements. Do not distribute a debug build as production.

The current app uses FFmpeg WebAssembly. The build script copies `@ffmpeg/core` runtime files into `public/ffmpeg/`; the payload is large and may not be suitable for low-memory devices. Test the built package on actual target devices. No APK/AAB has been built or signed by this source-only archive.

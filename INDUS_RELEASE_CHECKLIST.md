# Indus Appstore release checklist — not a certification

This ZIP contains editable web source, not a signed Android APK/AAB. Do not upload this ZIP as if it were an Android application package unless the current publisher portal explicitly requests source code.

## Before submission

- [ ] Confirm the current Indus Appstore developer requirements and supported upload format directly in the publisher portal.
- [ ] Decide packaging route (for example, a properly configured Android WebView/Capacitor wrapper); add native Android project, package ID, signing config, and SDK values only after selecting and testing that route.
- [ ] Build the web app from a clean install and retain the exact `package-lock.json`/resolved dependency tree.
- [ ] Audit all dependency licences, FFmpeg core build configuration, codec licences, and required notices. Keep required notices in the distributed app/package.
- [ ] Confirm CUTTAN name, logo, app icon, screenshots, store listing, and any slogans do not infringe third-party trademarks or copyrighted artwork. Conduct a trademark search; this package cannot certify clearance.
- [ ] Publish a real privacy policy and support contact; align the policy with the actual final binary, SDKs, hosting, and data flows.
- [ ] Test on real Android devices: import, supported codecs, portrait/landscape, 500 MB rejection, low-memory behavior, all output ratios, trim, rotation, speed/audio sync, filters, audio replacement, save/reopen settings, download/share, cancellation/failure handling, and process termination.
- [ ] Test airplane mode, engine load failure, insufficient storage, unsupported codecs, browser refresh, app background/foreground, and repeated exports.
- [ ] Do not advertise unsupported features: multi-track timeline, overlay video, mixed audio, text/sticker burn-in, transitions, 4K, AI, cloud, coins/subscriptions, or 10-layer editing.
- [ ] Generate and sign the native release APK/AAB, inspect permissions and target SDK against current store rules, run security checks, and submit through the publisher portal.

## Known release blockers in this source

1. No Android native wrapper, package identifier, signing files, or APK/AAB.
2. No real ten-track timeline/compositing engine.
3. Project JSON saves edit settings only, not source media.
4. FFmpeg core and codec licence configuration must be checked for the exact installed dependency/build.
5. Production build and real-device render tests have not been run in this environment.

# Security and privacy notes

- The current editor processes selected media in the browser; it does not implement an upload endpoint, account system, analytics SDK, or payment flow.
- Selected media is held in browser memory/object URLs and is not automatically saved into the project JSON.
- Do not add secrets to Vite variables prefixed with `VITE_`; those are exposed to the client bundle.
- Review dependency updates and the bundled FFmpeg core licence before every release.
- The service worker caches the app shell and built assets only. It intentionally skips `/ffmpeg/` and does not cache blobs or user media.
- Publish a privacy policy URL that matches the final shipped behaviour and hosting setup.

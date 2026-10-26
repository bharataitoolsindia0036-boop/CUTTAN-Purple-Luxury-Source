# CUTTAN Privacy Notice — draft for review

Last updated: 25 October 2026

This draft describes the source package as supplied and must be reviewed against the final distributed app and hosting setup before publication.

## Media and projects

The supplied app reads user-selected video and audio locally in the browser and runs the bundled FFmpeg WebAssembly engine in the browser for export. The source contains no account system, analytics SDK, advertising SDK, or media-upload endpoint. Exported files are downloaded to the user's device. Project JSON files contain edit settings and project name, not embedded media; users must reselect their original media when restoring a project.

## Browser storage and network

The app stores a list of recent project names in localStorage. Normal hosting requests may expose standard connection metadata to the hosting provider. Package installation/build requires network access to the npm registry. Do not claim that the app is completely offline until offline behavior is implemented and tested on the final build.

## Permissions

The web app does not request Android native permissions directly. The browser may ask for file access through its picker. The supplied version does not request microphone permission.

## Contact and changes

Before publishing, add a real support contact, business/legal identity as required, an accessible public privacy-policy URL, retention/deletion details, and a process for privacy requests. Do not publish this draft unchanged if the final app adds analytics, ads, accounts, cloud sync, payment processing, or other data collection.

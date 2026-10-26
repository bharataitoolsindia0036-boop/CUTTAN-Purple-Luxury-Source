# Third-party licence and attribution register

The first-party CUTTAN source, styles, and simple SVG icon in this package are provided under the MIT License in `LICENSE` (unless another notice applies). The CUTTAN name itself is not asserted to be trademark-cleared.

Dependencies declared in `package.json` are third-party software and retain their own licences. Before distributing a production build, regenerate this list from the exact resolved dependency tree and include the full licence text/notices required by each package:

- React / React DOM — MIT (verify the exact installed package notices).
- Vite and `@vitejs/plugin-react` — MIT (verify the exact installed package notices).
- TypeScript — Apache-2.0 (verify the exact installed package notices).
- lucide-react — ISC (verify the exact installed package notices).
- `@ffmpeg/ffmpeg` and `@ffmpeg/util` — consult the licence files in the exact installed package versions.
- `@ffmpeg/core` / FFmpeg — FFmpeg is LGPL by default, but the licence obligations depend on the exact build configuration and enabled libraries/codecs. Inspect the included core build's notices and build configuration. Do not assume every FFmpeg build is LGPL-compatible or that this document replaces legal review.

Build command `npm run build` copies the installed FFmpeg core JavaScript and WASM into `public/ffmpeg`; those files must retain their original notices/licence terms. Keep a copy of `node_modules/@ffmpeg/core` package licence files and the exact lockfile in release records.

No stock media, commercial LUT files, music tracks, third-party brand logos, or copied filter packs are included intentionally. Colour presets are authored as filter expressions; a visual style alone is not a guarantee of copyright or trademark clearance.

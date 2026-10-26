# CUTTAN Purple Luxury corrections

- Added a persistent 16-language selector in Settings.
- The navigation and primary editor/settings controls use the selected locale where translation strings are available. English remains the fallback for untranslated copy; this is not a complete translation of every sentence in all 16 languages yet.
- Added Settings controls for export quality and aspect ratio, and a compact Purple Luxury PRO/support section.
- Reduced mobile editor preview height and vertical spacing; reduced some expensive blur/backdrop effects on small screens.
- Preserved the existing project/editor structure and FFmpeg export path.

## Verification status

- Source files were updated.
- `npm run typecheck` could not be completed because dependencies were unavailable in the execution environment (`react`, FFmpeg packages, and `lucide-react` were not installed). Therefore build/runtime and Android thermal/overlap testing remain unverified. Do not describe this build as 100% tested.
- Translation coverage is partial for some languages; untranslated UI strings fall back to English.

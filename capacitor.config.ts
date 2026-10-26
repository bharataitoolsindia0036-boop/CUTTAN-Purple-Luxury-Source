import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.cuttanstudio.luteditor',
  appName: 'CUTTAN',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: { allowMixedContent: false },
  server: { androidScheme: 'https' }
};
export default config;

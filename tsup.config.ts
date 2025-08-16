import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/react/ToastProvider.tsx',
    'src/react/useToast.ts',
    'src/react/Toaster.tsx',
    'src/styles/toast.css'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  outDir: 'dist',
  external: ['react'],
  shims: false,
  skipNodeModulesBundle: true,
  bundle: false,
  loader: {
    '.css': 'file'
  }
});

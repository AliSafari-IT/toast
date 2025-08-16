import { defineConfig } from 'tsup';

export default defineConfig({
  tsconfig: './tsconfig.build.json',
  entry: {
    'index': 'src/index.ts',
    'react-ts': 'src/react-ts/index.ts'
  },
  format: ['esm', 'cjs'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  outDir: 'dist',
  external: ['react'],
  shims: false,
  skipNodeModulesBundle: true,
  bundle: true,
  loader: {
    '.css': 'copy'
  },
  onSuccess: 'cp src/styles/toast.css dist/styles.css'
});

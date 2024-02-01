import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import ElectronPlugin from 'vite-plugin-electron'
import RendererPlugin from 'vite-plugin-electron-renderer'
import EslintPlugin from 'vite-plugin-eslint'
import VuetifyPlugin from 'vite-plugin-vuetify'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'
import { rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { builtinModules } from 'module'

export default defineConfig(({ command, mode }) => {
  // Enable sourcemaps in development mode // MS 26.10.2023 Debugging
  const sourcemap = mode === 'development' ? 'inline' : false
  // Modify the default electron startup arguments to include --remote-debugging-port=9222
  const startupArgv = command === 'serve' ? ['.', '--no-sandbox'] : undefined

  if (startupArgv !== undefined && process.env.REMOTE_DEBUGGING_PORT !== undefined) {
    startupArgv.push(`--remote-debugging-port=${process.env.REMOTE_DEBUGGING_PORT}`)
  }

  rmSync('dist', { recursive: true, force: true })

  return {
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.vue', '.json', '.scss'],
      alias: {
        '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src')
      }
    },
    base: './',
    root: resolve('./src/renderer'),
    publicDir: resolve('./src/renderer/public'),
    clearScreen: false,
    build: {
      assetsDir: '', // See: https://github.com/electron-vite/electron-vite-vue/issues/287
      outDir: resolve('./dist'),
      sourcemap
    },
    plugins: [
      Vue(),
      VueJsx(),
      // Docs: https://github.com/vuetifyjs/vuetify-loader
      VuetifyPlugin({
        autoImport: true
      }),
      // Docs: https://github.com/gxmari007/vite-plugin-eslint
      EslintPlugin(),
      // Docs: https://github.com/electron-vite/vite-plugin-electron
      ElectronPlugin([
        {
          entry: ['src/main/index.ts'],
          onstart: (options) => {
            options.startup(startupArgv)
          },
          vite: {
            build: {
              assetsDir: '.',
              outDir: 'dist/main',
              rollupOptions: {
                external: ['electron', ...builtinModules]
              },
              sourcemap
            }
          }
        },
        {
          entry: ['src/preload/index.ts'],
          onstart: (options) => {
            options.reload()
          },
          vite: {
            build: {
              outDir: 'dist/preload',
              sourcemap
            }
          }
        }
      ]),
      RendererPlugin()
    ]
  }
})

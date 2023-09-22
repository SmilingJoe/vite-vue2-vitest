# vite-vue2-vitest

Minimal Vue2 application, using "vite" and "vitest" for unit tests.

Currently, this Vue2 application will run correctly, but the unit tests will fail with the following error:

```
SyntaxError: The requested module 'crypto' does not provide an export named 'webcrypto'
 ❯ ModuleJob._instantiate internal/modules/esm/module_job.js:124:21
 ❯ ModuleJob.run internal/modules/esm/module_job.js:179:5
 ❯ Loader.import internal/modules/esm/loader.js:178:24
 ❯ Object.setup vite-vue2-vitest/app/node_modules/vitest/dist/vendor-environments.b9b2f624.js:563:38
 ❯ withEnv vite-vue2-vitest/app/node_modules/vitest/dist/entry.js:71:15
 ❯ run vite-vue2-vitest/app/node_modules/vitest/dist/entry.js:95:3
 ❯ run vite-vue2-vitest/app/node_modules/vitest/dist/worker.js:92:5
 ❯ vite-vue2-vitest/app/node_modules/tinypool/dist/esm/worker.js:109:20
```

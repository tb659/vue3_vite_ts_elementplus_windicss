import type { App } from 'vue'

import Print from 'vue3-print-nb'

const plugins = [Print]

export const setupPrint = (app: App<Element>) => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

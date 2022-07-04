const viewGenerator = require('./plop/view/prompt.js')
const componentGenerator = require('./plop/component/prompt.js')
const apiGenerator = require('./plop/api/prompt.js')

module.exports = function (plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('api', apiGenerator)
}

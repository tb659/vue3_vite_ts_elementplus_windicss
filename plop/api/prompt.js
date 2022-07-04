
module.exports = {
  description: 'Create vue api',
  prompts: [
    {
      type: 'input',
      name: 'path',
      message: '请输入路径（Please enter a path）',
      default: 'api'
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入模块名称（Please enter module name）'
    }
  ],
  actions: (data) => {
    const { name, path } = data

    const actions = []
    if (name) {
      actions.push({
        type: 'add',
        path: `./src/${path}/${name}/types.ts`,
        templateFile: './plop/api/type.hbs'
      }, {
        type: 'add',
        path: `./src/${path}/${name}/index.ts`,
        templateFile: './plop/api/index.hbs'
      })
    }

    return actions
  }
}

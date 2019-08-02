export { default as request } from './request'

const handlers = require.context('./handlers', true, /^((?!\.d\.ts).)*(\.ts)$/)

handlers.keys().forEach(item => {
  const key = $app.toCamel(item.replace(/^\.\/(.*)\.ts$/, '$1'))
  module.exports[key] = handlers(item)
})

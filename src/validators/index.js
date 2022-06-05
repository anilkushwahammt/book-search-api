const Boom = require('boom')

const _validate = funcName => (boolValue, ...boomArgs) => {
  if (boolValue) {
    throw Boom[funcName](...boomArgs)
  }
}

module.exports = {
  badRequest: _validate('badRequest'),
  internal: _validate('internal'),
  notFound: _validate('notFound')
}

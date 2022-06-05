const { createLogger, format, transports } = require('winston')

const LOG_LEVEL = process.env.LOG_LEVEL || 'info'

const formatError = format((info) => {
  const _formatError = ({ isBoom, message, data, output, stack }) => ({ error: { isBoom, message, data, output, stack } })
  const splatList = info[Symbol.for('splat')] || []
  if (info instanceof Error) info = { ...info, ..._formatError(info) }
  for (const s of splatList) {
    info = { ...info, ...(s instanceof Error ? _formatError(s) : s) }
  }
  return info
})

const logger = createLogger({
  level: LOG_LEVEL || 'info',
  stderrLevels: ['error'],
  format: format.combine(
    format.timestamp(),
    formatError(),
    format.colorize(),
    format.simple()
  ),
  transports: [new transports.Console()]
})

module.exports = logger

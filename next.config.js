
const dotEnvResult = require('dotenv').config()
const withCSS = require('@zeit/next-css');

const prod = process.env.NODE_ENV === 'production'

if (dotEnvResult.error) {
  throw dotEnvResult.error
}
const parsedVariables = dotEnvResult.parsed || {}
const dotEnvVariables = {}

for (const key of Object.keys(parsedVariables)) {
	dotEnvVariables[key] = process.env[key]
  }
  module.exports = withCSS({
	env: {
	  ...dotEnvVariables,
	  BACKEND_URL: prod ? 'https://api.example.com' : 'https://localhost:3000'
	}
  }
  )

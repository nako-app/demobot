const fetch = require('node-fetch')
const { initializeConfig } = require('lambda-ssm-loader')

exports.lambdaHandler = async (event, context) => {
  try {
    console.log('Loading config')

    await initializeConfig(`/prod/demo`)

    console.log(process.env)

    const response = await fetch(`${process.env.API_ENDPOINT}/v1/activities`, {
      headers: {
        'x-api-key': process.env.API_KEY
      }
    })
    const json = await response.json()

    console.log(json)

    return {
      statusCode: 200
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

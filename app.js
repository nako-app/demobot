const { initializeConfig } = require('lambda-ssm-loader')
const { NakoIngestApi } = require('nako-server-sdk')

exports.lambdaHandler = async (event, context) => {
  try {
    console.log('Loading config')

    await initializeConfig('/prod/demo')
    const sdk = NakoIngestApi.init(process.env.API_KEY)

    const response = await sdk.createActivity({
      happenedAt: Date.now(),
      operation: 'CREATE',
      resource: {
        id: '12345',
        name: 'My Support Case'
      },
      actor: {
        id: '12345',
        firstName: 'John',
        lastName: 'Doe'
      }
    })

    console.log(response)

    return {
      statusCode: 200
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

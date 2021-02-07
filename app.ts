import initializeConfig from 'lambda-ssm-loader/config.js'
import nakoSdk from 'nako-server-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Loading config')

  try {
    await initializeConfig('/prod/demo')

    const apiKey = process.env['API_KEY'] ?? ''

    const sdk = nakoSdk.NakoIngestApi.init(apiKey)

    const response = await sdk.createActivity({
      happenedAt: new Date(),
      operation: 'CREATE',
      resources: [
        {
          id: '12345',
          name: 'My Support Case'
        }
      ],
      actors: [
        {
          id: '12345',
          firstName: 'John',
          lastName: 'Doe'
        }
      ],
      result: {
        status: 'success'
      },
      state: {
        status: 'completed'
      }
    })

    console.log(response)

    return {
      statusCode: 200,
      body: ''
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

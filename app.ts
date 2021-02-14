import ssmLoader from 'lambda-ssm-loader'
import { NakoIngestApi, ActivityResultStatus, ActivityStateStatus } from 'nako-server-sdk'

export async function lambdaHandler(event, context) {
  console.log('Loading config')

  try {
    await ssmLoader.initializeConfig('/prod/demo')

    const apiKey = process.env['API_KEY'] ?? ''

    const sdk = NakoIngestApi.init(apiKey)

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
          lastName: 'Doe',
          isPrimary: true
        }
      ],
      result: {
        status: ActivityResultStatus.Success
      },
      state: {
        status: ActivityStateStatus.Completed
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

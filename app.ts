import ssmLoader from 'lambda-ssm-loader'
import {
  NakoIngestApi,
  ActivityResultStatus,
  ActivityStateStatus,
  ActivityActorType,
  CreatedActivity
} from 'nako-server-sdk'
import { v4 as uuid } from 'uuid'
import randomInt from 'random-int'
import randomItem from 'random-item'

export async function lambdaHandler(event, context) {
  console.log('Loading config')

  let possibleFirstNames = [
    'Gabriel',
    'Oswaldo',
    'Josephine',
    'Riley',
    'Vicki',
    'Shawn',
    'Elisabeth',
    'Lester',
    'Vance',
    'Jerry',
    'Michael'
  ]

  let possibleLastNames = [
    'Richmond',
    'Vaughn',
    'Mccormick',
    'Boyd',
    'Kirk',
    'Carroll',
    'Thornton',
    'Vincent',
    'Schneider',
    'Tucker'
  ]

  let possibleOperations = ['CREATE', 'REMOVE', 'TRAIN', 'SWITCH_TRAFFIC', 'START', 'MONITOR']

  let possibleResourceTypes = [
    'MACHINE_LEARNING_MODEL',
    'WORKFLOW',
    'PROJECT',
    'USER',
    'SUPPORT_CASE'
  ]

  try {
    await ssmLoader.initializeConfig('/prod/demo')

    const apiKey = process.env['API_KEY'] ?? ''

    const sdk = NakoIngestApi.init(apiKey)

    const response: CreatedActivity = await sdk.createActivity({
      happenedAt: new Date(),
      operation: randomItem(possibleOperations),
      resources: [
        {
          id: uuid,
          type: randomItem(possibleResourceTypes)
        }
      ],
      actors: [
        {
          id: uuid,
          firstName: randomItem(possibleFirstNames),
          lastName: randomItem(possibleLastNames),
          type: ActivityActorType.User
        }
      ],
      result: {
        status: ActivityResultStatus.Success
      },
      state: {
        status: ActivityStateStatus.Completed
      },
      metadata: new Map<string, number>([
        ['customer_organization_id', randomInt(1000)],
        ['version', randomInt(5)]
      ])
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

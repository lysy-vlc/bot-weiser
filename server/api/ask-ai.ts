import { FetchError, FetchResponse } from 'ofetch'

export default defineEventHandler(async (event) => {

  if (event.node.req.method === 'POST') {
    const body = await readBody(event)

    if (!body?.question) throw new Error('Provide question!')

    try {
      const response = await $fetch<{ 'out-0': string }>(
        'https://www.stack-inference.com/run_deployed_flow?flow_id=64b6732ee6e6573c75ca8ea2&org=69dcea64-60e9-43ef-b092-fd783ab1d925',
        {
          headers: {'Authorization':
              'Bearer f06d7030-4aab-472b-82ea-38d4565e8ffe',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            'in-0': body?.question
          }),
        }
      )

      if (response?.['out-0'].length) return response['out-0']

      return createError({
        statusCode: 404,
        message: 'Response not found',
      })
    } catch (e) {
      throw createError({
        statusCode: 500,
        message: 'Oh no!',
        data: {
          statusCode: (e as FetchError).response?.status,
          responseBody: (e as FetchError).data,
        },
      })
    }
  }
})

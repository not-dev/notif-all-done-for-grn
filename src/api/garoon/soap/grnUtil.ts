import { postRequest } from '@api/garoon'

const location = '/g/util_api/util/api.csp?'

const getRequestToken = async (): Promise<string> => {
  const res = await postRequest(location, {
    action: 'UtilGetRequestToken',
    parameters: '<parameters></parameters>'
  })
  const token = res.body.returns?.getElementsByTagName('request_token')[0]?.innerHTML

  if (typeof token === 'undefined') { throw new Error('token is undefined') }

  return token
}

export { getRequestToken }

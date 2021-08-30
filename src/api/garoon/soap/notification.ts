import { getRequestToken, postRequest } from '@api/garoon'

type NotificationId = {
  moduleId: string
  item: string
}

const location = '/g/cbpapi/notification/api.csp?'

const clearNotification = async (notifications:Array<NotificationId>):Promise<Array<unknown>> => {
  const params = notifications.map(i => `<notification_id module_id="${i.moduleId}" item="${i.item}" />`)

  if (params.length === 0) return []

  const token = await getRequestToken()

  const res = await postRequest(location, {
    action: 'NotificationConfirmNotification',
    parameters: `\
    <parameters>
      <request_token>${token}</request_token>
      ${params.join('')}
    </parameters>`
  })
  const elems = res.body.returns?.getElementsByTagName('notification') || []
  const ids = Array.from(elems).map(elem => elem.getAttribute('item')).filter(i => i)
  return ids
}

export { clearNotification }

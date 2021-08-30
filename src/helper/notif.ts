import { clearNotification, getNotification } from '@api/garoon'

const allDone = async ():Promise<Array<unknown>> => {
  console.log('click')
  const notifs = await getNotification()
  console.log(notifs)
  const params = notifs.map(n => ({ moduleId: n.moduleId, item: n.notificationKey }))
  const res = await clearNotification(params)
  console.log(res)
  return res
}

export { allDone }

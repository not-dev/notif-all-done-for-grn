import { getRestRequest } from '@api/garoon'

const location = '/g/api/v1/notification/items'

type NotificationsItem = {
  body: string
  createdAt: string
  creator: {id: string, code: string, name: string}
  icon: string
  isRead: boolean
  moduleId: string
  notificationKey: string
  operation: string
  title: string
  url: string
}

type Notifications = {
  hasNext: boolean
  items: NotificationsItem[]
}

const getNotification = async (): Promise<NotificationsItem[]> => {
  const res = await getRestRequest<Notifications>(location)
  return res.body?.items || []
}

export { getNotification }

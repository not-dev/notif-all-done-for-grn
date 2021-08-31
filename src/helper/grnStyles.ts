const notifBadgeClear = ():void => {
  const notifBadge = document.getElementById('notification_number')
  if (notifBadge) notifBadge.style.display = 'none'
}

export { notifBadgeClear }

/**
 * 用户信息完善
 *  /laoban
 *  /dashen
 * 用户信息不完善
 *  /laobaninfo
 *  /dasheninfo
 * @param {*} type 
 * @param {*} header 
 */
export function getRedirect(type, header) {
  let path

  if (type === 'laoban') {
    path = '/laoban'
  } else {
    path = '/dashen'
  }

  if (!header) {
    path += 'info'
  }

  return path
}
import { DateTime } from 'luxon'

export default () => {
  return DateTime.now().toFormat('yyyy年MM月dd日 HH時mm分ss秒')
}

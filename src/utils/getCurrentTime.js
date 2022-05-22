import { DateTime } from 'luxon'

export default (type) => {
  if (type === 'full') return DateTime.now().toFormat('yyyy年MM月dd日 HH時mm分ss秒')
  if (type === 'simple') return DateTime.now().toFormat('yyyy-MM-dd')
}

export default function quickSort (arr, key) {
  if (arr.length <= 1) {
    return arr
  }
  const left = []
  const right = []
  const midIndex = parseInt(arr.length / 2)
  const mid = arr[midIndex]

  for (let i = 0; i < arr.length; i++) {
    if (i === midIndex) continue
    if (parseInt(arr[i][key]) > parseInt(mid[key])) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left, key).concat([mid], quickSort(right, key))
}

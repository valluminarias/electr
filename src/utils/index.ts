import dayjs from "dayjs"
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)

const formatDate = (dt: number, format: string) => {
  return dayjs(dt).format(format)
}

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(num)
}

export {
  formatDate,
  formatCurrency,
}

export default function () {
  return {
    formatDate,
    formatCurrency,
  }
}
import dayjs from "dayjs"

const formatDate = (dt: number) => {
  return dayjs(dt).format('YYYY - MMMM')
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(num)
}

export {
  formatDate,
  formatNumber,
}

export default function () {
  return {
    formatDate,
    formatNumber,
  }
}
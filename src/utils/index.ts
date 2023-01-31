import dayjs from "dayjs"

const formatDate = (dt: number) => {
  return dayjs(dt).format('YYYY - MMMM')
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
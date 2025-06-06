
const DisplayINRCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-IN',{
    style : 'currency',
    currency : 'INR',
    minimumFractionDigit :2,
  })
  return formatter.format(num)
}

export default DisplayINRCurrency
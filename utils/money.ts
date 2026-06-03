export const money = (amount: number) => {
  return new Intl.NumberFormat('eb-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

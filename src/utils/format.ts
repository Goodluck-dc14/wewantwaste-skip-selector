export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(price)
}

export const formatPriceBreakdown = (
  priceBeforeVat: number,
  vat: number,
): { beforeVat: string; vatAmount: string; total: string } => {
  const vatAmount = Math.round(priceBeforeVat * (vat / 100))
  const total = priceBeforeVat + vatAmount

  return {
    beforeVat: formatPrice(priceBeforeVat),
    vatAmount: formatPrice(vatAmount),
    total: formatPrice(total),
  }
}

export const formatHirePeriod = (days: number): string => {
  if (days === 1) return "1 day hire"
  if (days === 7) return "1 week hire"
  if (days === 14) return "2 weeks hire"
  if (days === 21) return "3 weeks hire"
  if (days === 28) return "4 weeks hire"
  return `${days} day hire`
}

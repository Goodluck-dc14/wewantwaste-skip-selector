import { describe, it, expect } from 'vitest'
import { formatPrice, formatHirePeriod, formatPriceBreakdown } from '../format'

describe('Format Utils', () => {
  describe('formatPrice', () => {
    it('formats price correctly', () => {
      expect(formatPrice(334)).toBe('£334')
      expect(formatPrice(1000)).toBe('£1,000')
    })
  })

  describe('formatHirePeriod', () => {
    it('formats hire periods correctly', () => {
      expect(formatHirePeriod(1)).toBe('1 day hire')
      expect(formatHirePeriod(7)).toBe('1 week hire')
      expect(formatHirePeriod(14)).toBe('2 weeks hire')
      expect(formatHirePeriod(21)).toBe('3 weeks hire')
      expect(formatHirePeriod(30)).toBe('30 day hire')
    })
  })

  describe('formatPriceBreakdown', () => {
    it('calculates VAT breakdown correctly', () => {
      const result = formatPriceBreakdown(278, 20)

      expect(result.beforeVat).toBe('£278')
      expect(result.vatAmount).toBe('£56')
      expect(result.total).toBe('£334')
    })
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SkipCard } from '../SkipCard'
import type { Skip } from '@/types/skip'

const mockSkip: Skip = {
  id: '1',
  name: '4 Yard Skip',
  size: '4 Yards',
  price: 334,
  priceBeforeVat: 278,
  vat: 20,
  hire_period: 14,
  description: 'Perfect for small household clearouts',
  allowed_on_road: true,
  allows_heavy_waste: true,
  suitable_for: ['Garden waste', 'Household items'],
}

describe('SkipCard', () => {
  it('renders skip information correctly', () => {
    const mockOnSelect = vi.fn()

    render(
      <SkipCard skip={mockSkip} isSelected={false} onSelect={mockOnSelect} />
    )

    expect(screen.getByText('4 Yard Skip')).toBeInTheDocument()
    expect(
      screen.getByText('Perfect for small household clearouts')
    ).toBeInTheDocument()
    expect(screen.getByText('£334')).toBeInTheDocument()
    expect(screen.getByText('2 weeks hire')).toBeInTheDocument()
  })

  it('calls onSelect when clicked', () => {
    const mockOnSelect = vi.fn()

    render(
      <SkipCard skip={mockSkip} isSelected={false} onSelect={mockOnSelect} />
    )

    fireEvent.click(screen.getByRole('button', { pressed: false }))
    expect(mockOnSelect).toHaveBeenCalledWith(mockSkip)
  })

  it('shows selected state correctly', () => {
    const mockOnSelect = vi.fn()

    render(
      <SkipCard skip={mockSkip} isSelected={true} onSelect={mockOnSelect} />
    )

    expect(screen.getByText('Selected')).toBeInTheDocument()
    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument()
  })

  it('displays road placement badge when allowed', () => {
    const mockOnSelect = vi.fn()

    render(
      <SkipCard skip={mockSkip} isSelected={false} onSelect={mockOnSelect} />
    )

    expect(screen.getByText('Road placement OK')).toBeInTheDocument()
  })
})

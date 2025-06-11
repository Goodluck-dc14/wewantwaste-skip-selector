import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useSkips } from '../useSkips'

// Mock fetch
global.fetch = vi.fn()

describe('useSkips', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns loading state initially', () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockImplementation(() => new Promise(() => {})) // Never resolves

    const { result } = renderHook(() => useSkips())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)
  })

  it('handles successful API response', async () => {
    const mockData = [
      {
        id: 17933,
        size: 4,
        hire_period_days: 14,
        price_before_vat: 278,
        vat: 20,
        postcode: 'NR32',
        area: '',
        forbidden: false,
        allowed_on_road: true,
        allows_heavy_waste: true,
        created_at: '2025-04-03T13:51:46.897146',
        updated_at: '2025-04-07T13:16:52.813',
        transport_cost: null,
        per_tonne_cost: null,
      },
    ]

    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response)

    const { result } = renderHook(() => useSkips())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data?.skips).toHaveLength(1)
    expect(result.current.data?.skips[0].name).toBe('4 Yard Skip')
    expect(result.current.error).toBe(null)
  })
})

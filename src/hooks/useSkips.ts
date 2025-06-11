"use client"

import { useState, useEffect } from "react"
import type { SkipApiResponse, SkipApiItem, Skip } from "@/types/skip"

// Helper function to calculate final price with VAT
const calculateFinalPrice = (priceBeforeVat: number, vat: number): number => {
  return Math.round(priceBeforeVat * (1 + vat / 100))
}

// Helper function to generate skip descriptions based on size and properties
const generateSkipDescription = (size: number, allowedOnRoad: boolean, allowsHeavyWaste: boolean): string => {
  const sizeDescriptions: Record<number, string> = {
    4: "Perfect for small household clearouts and garden waste",
    6: "Ideal for medium-sized home renovations and DIY projects",
    8: "Great for larger home projects and small commercial jobs",
    10: "Perfect for major home renovations and medium commercial use",
    12: "Ideal for large commercial projects and major clearouts",
    14: "Great for substantial commercial and construction projects",
    16: "Perfect for large-scale commercial and industrial use",
    20: "Ideal for major commercial and construction projects",
    40: "Our largest skip for major industrial and commercial use",
  }

  let description = sizeDescriptions[size] || `${size} yard skip for your waste disposal needs`

  if (!allowedOnRoad) {
    description += " (Requires private property placement)"
  }

  if (allowsHeavyWaste) {
    description += " - Suitable for heavy materials"
  }

  return description
}

// Helper function to generate suitable_for array based on skip properties
const generateSuitableFor = (size: number, allowedOnRoad: boolean, allowsHeavyWaste: boolean): string[] => {
  const baseUses: string[] = []

  if (size <= 6) {
    baseUses.push("Garden waste", "Household items")
  } else if (size <= 10) {
    baseUses.push("Home renovation", "DIY projects")
  } else if (size <= 16) {
    baseUses.push("Commercial waste", "Construction projects")
  } else {
    baseUses.push("Industrial waste", "Major construction")
  }

  if (allowsHeavyWaste) {
    baseUses.push("Heavy materials")
  }

  if (allowedOnRoad) {
    baseUses.push("Roadside placement")
  }

  return baseUses
}

// Transform API data to our Skip interface
const transformApiData = (apiData: SkipApiItem[], postcode: string, area: string): SkipApiResponse => {
  const skips: Skip[] = apiData.map((item) => ({
    id: item.id.toString(),
    name: `${item.size} Yard Skip`,
    size: `${item.size} Yards`,
    price: calculateFinalPrice(item.price_before_vat, item.vat),
    priceBeforeVat: item.price_before_vat,
    vat: item.vat,
    hire_period: item.hire_period_days,
    description: generateSkipDescription(item.size, item.allowed_on_road, item.allows_heavy_waste),
    suitable_for: generateSuitableFor(item.size, item.allowed_on_road, item.allows_heavy_waste),
    allowed_on_road: item.allowed_on_road,
    allows_heavy_waste: item.allows_heavy_waste,
    transport_cost: item.transport_cost,
    per_tonne_cost: item.per_tonne_cost,
  }))

  return {
    skips,
    location: { postcode, area },
  }
}

export const useSkips = (postcode = "NR32", area = "Lowestoft") => {
  const [data, setData] = useState<SkipApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setIsLoading(true)
        setError(null)

        console.log(`Fetching skips for postcode: ${postcode}, area: ${area}`)

        const response = await fetch(
          `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`,
        )

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`)
        }

        const apiData: SkipApiItem[] = await response.json()
        console.log("Raw API data:", apiData)

        if (!Array.isArray(apiData)) {
          throw new Error("API response is not an array")
        }

        if (apiData.length === 0) {
          throw new Error("No skips available for this location")
        }

        // Filter out forbidden skips
        const availableSkips = apiData.filter((skip) => !skip.forbidden)

        if (availableSkips.length === 0) {
          throw new Error("No available skips for this location")
        }

        const transformedData = transformApiData(availableSkips, postcode, area)
        console.log("Transformed data:", transformedData)

        setData(transformedData)
      } catch (err) {
        console.error("Error fetching skips:", err)
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkips()
  }, [postcode, area])

  return { data, isLoading, error, isError: !!error }
}

"use client"

import type { Skip } from "@/types/skip"
import { formatPrice, formatHirePeriod, formatPriceBreakdown } from "@/utils/format"
import { cn } from "@/utils/cn"
import { Check, Package, Truck, Weight, AlertTriangle } from "lucide-react"

interface SkipCardProps {
  skip: Skip
  isSelected: boolean
  onSelect: (skip: Skip) => void
}

export const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  // Create a visual size indicator based on skip size
  const getSizeIndicator = (size: string) => {
    const sizeNum = Number.parseInt(size)
    if (sizeNum <= 6) return { height: "h-4", color: "bg-green-400" }
    if (sizeNum <= 10) return { height: "h-6", color: "bg-yellow-400" }
    if (sizeNum <= 16) return { height: "h-8", color: "bg-orange-400" }
    return { height: "h-10", color: "bg-red-400" }
  }

  const sizeIndicator = getSizeIndicator(skip.size)
  const priceBreakdown = formatPriceBreakdown(skip.priceBeforeVat, skip.vat)

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300 p-6 cursor-pointer transform hover:scale-105 animate-fade-in",
        isSelected && "ring-2 ring-teal-500 border-teal-500 shadow-lg",
      )}
      onClick={() => onSelect(skip)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(skip)
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="space-y-4">
        {/* Visual size indicator */}
        <div className="flex items-center space-x-3">
          <Package className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <div
              className={cn("rounded-full transition-all duration-300", sizeIndicator.height, sizeIndicator.color)}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-600">{skip.size}</span>
        </div>

        {/* Skip name */}
        <h3 className="text-xl font-semibold text-gray-900">{skip.name}</h3>

        {/* Description */}
        {skip.description && <p className="text-gray-600 text-sm leading-relaxed">{skip.description}</p>}

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {skip.allowed_on_road ? (
            <div className="flex items-center space-x-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
              <Truck className="w-3 h-3" />
              <span>Road placement OK</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
              <AlertTriangle className="w-3 h-3" />
              <span>Private property only</span>
            </div>
          )}

          {skip.allows_heavy_waste && (
            <div className="flex items-center space-x-1 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
              <Weight className="w-3 h-3" />
              <span>Heavy waste OK</span>
            </div>
          )}
        </div>

        {/* Suitable for */}
        {skip.suitable_for && skip.suitable_for.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {skip.suitable_for.slice(0, 2).map((item, index) => (
              <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Price and hire period */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-teal-700">{priceBreakdown.total}</div>
              <div className="text-xs text-gray-500">
                {priceBreakdown.beforeVat} + {priceBreakdown.vatAmount} VAT
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">{formatHirePeriod(skip.hire_period)}</div>

          {/* Additional costs */}
          {(skip.transport_cost || skip.per_tonne_cost) && (
            <div className="text-xs text-gray-500 space-y-1">
              {skip.transport_cost && <div>Transport: {formatPrice(skip.transport_cost)}</div>}
              {skip.per_tonne_cost && <div>Per tonne: {formatPrice(skip.per_tonne_cost)}</div>}
            </div>
          )}
        </div>

        {/* Select button */}
        <button
          className={cn(
            "w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2",
            isSelected
              ? "bg-teal-600 text-white shadow-md hover:bg-teal-700"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700",
          )}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(skip)
          }}
        >
          {isSelected && <Check className="w-4 h-4" />}
          <span>{isSelected ? "Selected" : "Select This Skip"}</span>
        </button>
      </div>
    </div>
  )
}

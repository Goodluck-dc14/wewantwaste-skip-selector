"use client"

import { useState } from "react"
import { useSkips } from "@/hooks/useSkips"
import type { Skip } from "@/types/skip"
import { SkipCard } from "./SkipCard"
import { SkipCardSkeleton } from "./SkipCardSkeleton"
import { AlertCircle, ArrowLeft, ArrowRight, MapPin } from "lucide-react"

export const SkipSelector = () => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null)
  const { data, isLoading, error, isError } = useSkips()

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(selectedSkip?.id === skip.id ? null : skip)
  }

  const handleContinue = () => {
    if (selectedSkip) {
      // Here you would typically navigate to the next step
      console.log("Continuing with skip:", selectedSkip)
      alert(`Selected: ${selectedSkip.name} - ${selectedSkip.price}`)
    }
  }

  if (isError && error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Skip Options</h2>
          <p className="text-gray-600 mb-6">
            {error?.message || "We're having trouble loading the available skip sizes. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Skip Size</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Select the skip size that best suits your needs. All prices include VAT and delivery.
          </p>

          {/* Location info */}
          {data && (
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>
                Showing prices for {data.location.postcode} {data.location.area}
              </span>
            </div>
          )}
        </div>

        {/* Skip count info */}
        {data && !isLoading && (
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600">
              {data.skips.length} skip size{data.skips.length !== 1 ? "s" : ""} available
            </p>
          </div>
        )}

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <SkipCardSkeleton key={index} />)
            : data?.skips.map((skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedSkip?.id === skip.id}
                  onSelect={handleSkipSelect}
                />
              ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200">
          <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center space-x-2 w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-center">
            {selectedSkip && (
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Selected: <span className="font-semibold">{selectedSkip.name}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {selectedSkip.price} for {selectedSkip.hire_period} days
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedSkip}
            className={`flex items-center space-x-2 w-full sm:w-auto font-semibold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95 ${
              selectedSkip
                ? "bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

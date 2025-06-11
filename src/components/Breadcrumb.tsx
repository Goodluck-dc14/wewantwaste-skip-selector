import { ChevronRight } from "lucide-react"

const steps = [
  { name: "Choose Address", completed: true },
  { name: "Garden Waste", completed: true },
  { name: "Choose Skip Size", current: true },
  { name: "Permit Check", completed: false },
  { name: "Choose Date", completed: false },
  { name: "Payment", completed: false },
]

export const Breadcrumb = () => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center py-4 overflow-x-auto">
          <ol className="flex items-center space-x-2 min-w-max">
            {steps.map((step, index) => (
              <li key={step.name} className="flex items-center">
                <div
                  className={`flex items-center text-sm font-medium ${
                    step.current ? "text-teal-600" : step.completed ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  <span className={step.current ? "font-bold" : ""}>{step.name}</span>
                </div>
                {index < steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}

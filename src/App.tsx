import { Breadcrumb } from "./components/Breadcrumb"
import { SkipSelector } from "./components/SkipSelector"
import { ErrorBoundary } from "./components/ErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb />
        <SkipSelector />
      </div>
    </ErrorBoundary>
  )
}

export default App

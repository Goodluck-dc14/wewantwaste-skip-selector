import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure there is a div with id='root' in your HTML."
  )
}

// Remove React.StrictMode for CodeSandbox to prevent double renders
ReactDOM.createRoot(rootElement).render(<App />)

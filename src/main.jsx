import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { MoviesProvider } from './component/Movie-Database/components/MovieContext.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </Router>
)

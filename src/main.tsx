import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import { BookingProvider } from './context/BookingContext'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </LanguageProvider>
  </StrictMode>,
)

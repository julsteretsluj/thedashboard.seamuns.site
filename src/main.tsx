import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import './index.css'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const hasAuth0 = Boolean(domain && clientId)

const app = (
  <StrictMode>
    <BrowserRouter>
      {hasAuth0 ? (
        <Auth0Provider
          domain={domain!}
          clientId={clientId!}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      ) : (
        <App />
      )}
    </BrowserRouter>
  </StrictMode>
)

createRoot(document.getElementById('root')!).render(app)

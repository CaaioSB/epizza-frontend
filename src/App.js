import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Helmet from 'react-helmet'
import { ToastContainer } from 'react-toastify'
// import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
// import store from './redux/store'

import Loader from 'components/Loader'

import { useUser } from 'context/user-context'

import Theme from 'theme'

import 'sanitize.css/sanitize.css'
import 'react-toastify/dist/ReactToastify.css'

const loadAuthenticatedApp = () => import('./AuthenticatedApp')
const AuthenticatedApp = lazy(loadAuthenticatedApp)
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

const GlobalStyle = createGlobalStyle`
#root, body {
  height: 100vh
}

* {
  font-family: 'Poppins', sans-serif;
  border: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}

button, a {
  cursor: pointer;
  &:disabled{
    cursor: not-allowed;
  }
}

/* width */
::-webkit-scrollbar {
  height: 5px;
  width: 5px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 50px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 50px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 50px;
}

.leaflet-pane {
  z-index: 0 !important;
}

.leaflet-control .leaflet-top, .leaflet-bottom {
  z-index: 0 !important;
}
`

const App = () => {
  const { user } = useUser()
  useEffect(() => {
    loadAuthenticatedApp()
  }, [])

  return (
    // <Provider store={store}>
    <Theme>
      <Helmet titleTemplate='Nave.rs | %s' />
      <GlobalStyle />
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense fallback={<Loader />}>
        <Router>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Router>
      </Suspense>
    </Theme>
    // </Provider>
  )
}

export default App


import { mainTheme as theme } from '@components/theme'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

const Page = React.lazy(() => import(/* webpackChunkName: "home", webpackPrefetch: true */ '@components/pages/default'))

const rootDOM = document.getElementById('root')
if (rootDOM != null) rootDOM.dataset.version = '0.1.0'

import('react-dom')
  .then(ReactDOM => {
    ReactDOM.render(
      <React.StrictMode>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <React.Suspense fallback={<></>}>
              <Page />
            </React.Suspense>
          </ThemeProvider>
        </StylesProvider>
      </React.StrictMode>,
      rootDOM
    )
  })
  .catch(e => { throw e })

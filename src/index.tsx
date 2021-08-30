import { App } from '@components/organisms'
import { grnTheme as theme } from '@components/theme'
import { CssBaseline } from '@material-ui/core'
import { createGenerateClassName, StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'

const rootDOM = document.createElement('div')
rootDOM.style.display = 'inline'
rootDOM.id = 'notif-all-done-root'
const parent = document.getElementById('tag-grnNotification-grn')
parent?.parentNode?.appendChild(rootDOM)

const generateClassName = createGenerateClassName({
  seed: 'notif-all-done'
})

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <App />
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  rootDOM
)

import { createMuiTheme } from '@material-ui/core'

const baseTheme = createMuiTheme({
  palette: {
    type: 'light',
    action: {
      hoverOpacity: 0.2
    }
  },
  typography: {
    fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
  }
})

const grnTheme = createMuiTheme({
  ...baseTheme
})

export { grnTheme }

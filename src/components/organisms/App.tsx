import type { AlertSnackbarProps } from '@components/atoms'
import { AlertSnackbar } from '@components/atoms'
import { allDone } from '@helper'
import { Box, IconButton } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { DoneAll } from '@material-ui/icons'
import React from 'react'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 48,
      height: 48,
      display: 'inline-flex',
      verticalAlign: 'middle',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center'
    },
    doneIcon: {
      color: theme.palette.getContrastText(theme.palette.text.primary)
    },
    button: {
      height: 68, // SQRT(2*(48^2))
      width: 68,
      fontSize: 28,
      '&:hover': {
        border: 'none'
      },
      '&:focus': {
        outline: 'none'
      },
      '&:disabled': {
        border: 'none'
      }
    }
  })
)

const App: React.FC = () => {
  const classes = useStyles()

  const [result, setResult] = React.useState<AlertSnackbarProps>({
    open: false
  })

  const handleClick = async (): Promise<void> => {
    await allDone()
      .then((res) => {
        setResult({
          severity: 'success',
          message: `${res.length}個の通知を既読`,
          open: true,
          onClose: () => {
            setResult({
              open: false,
              severity: 'success'
            })
          }
        })
      }).catch(() => {
        setResult({
          severity: 'error',
          message: 'ERROR',
          open: true,
          onClose: () => {
            setResult({
              open: false,
              severity: 'error'
            })
          }
        })
      })
  }

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <IconButton className={classes.button} onClick={handleClick}>
          <DoneAll className={classes.doneIcon}/>
        </IconButton>
      </Box>
      <AlertSnackbar {...result}/>
    </React.Fragment>
  )
}

export { App }

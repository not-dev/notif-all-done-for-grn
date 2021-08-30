import { Container } from '@material-ui/core'
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React from 'react'

const Alert: React.FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    minWidth: 296,
    color: theme.palette.common.white
  }
}))

type AlertSnackbarProps = SnackbarProps & {
  open: SnackbarProps['open']
  onClose?: SnackbarProps['onClose']
  severity?: AlertProps['severity']
  message?: React.ReactNode
  alertProps?: AlertProps
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ severity, message, alertProps, ...props }) => {
  const classes = useStyles()

  return (
    <Container maxWidth='lg' fixed>
      <Snackbar
        open={props.open}
        onClose={props.onClose}
        autoHideDuration={2000}
        { ...props }
        >
        <Alert className={classes.content}
          severity={severity}
          { ...alertProps }
          >
          { message }
        </Alert>
      </Snackbar>
    </Container>
  )
}

export { AlertSnackbar }
export type { AlertSnackbarProps }

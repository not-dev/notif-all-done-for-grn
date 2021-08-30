import { FlexBox } from '@components/atoms'
import { CircularProgress } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(5)
    }
  })
)

const Loading:React.FC = () => {
  const classes = useStyles()

  return (
    <FlexBox className={classes.progress}>
      <CircularProgress color='inherit'/>
    </FlexBox>
  )
}

export { Loading }


import Logo from '@assets/logo.svg'
import { FlexBox } from '@components/atoms'
import { Loading } from '@components/molecules'
import { Box, Container, IconButton, Toolbar, Tooltip } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { HelpOutline as HelpIcon } from '@material-ui/icons'
import { sleep } from '@util'
import React from 'react'
import usePromise from 'react-promise-suspense'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: '100vh',
      padding: theme.spacing(2)
    },
    toolbar: {
      padding: theme.spacing(2)
    },
    logo: {
      height: '40vmin',
      pointerEvents: 'none',
      animation: '$spin infinite 20s linear'
    },
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' }
    }
  })
)

type AppProps = {
  title: React.ReactElement
}

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles()

  console.log('# Render App')

  const Suspensed = () => {
    console.log('Suspense')
    const promise = async () => {
      await sleep(1)

      return (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          >
          <Logo className={classes.logo}/>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </Box>
      )
    }
    const data = usePromise(promise, [])

    return (
      <React.Suspense fallback={<Loading />}>
        {data}
      </React.Suspense>
    )
  }

  return (
    <Container maxWidth='md' className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <FlexBox justifyContent='flex-start'>
          {props.title}
        </FlexBox>
        <Box>
          <Tooltip title='' enterDelay={300}>
            <IconButton><HelpIcon /></IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      <FlexBox>
        <React.Suspense fallback={<Loading />}>
          <Suspensed/>
        </React.Suspense>
      </FlexBox>
    </Container>
  )
}

export { App }

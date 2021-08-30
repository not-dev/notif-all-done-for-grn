import Title from '@assets/title.svg'
import { App } from '@components/organisms'
import { Link } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const Home: React.FC = () => {
  const theme = useTheme()
  return (
    <App
      title={
        <Link href='./' target='_blank' rel='noreferrer' tabIndex={-1} underline='none' style={{ height: theme.typography.h6.fontSize }}>
          <Title
            fill={theme.palette.common.white}
            height={theme.typography.h6.fontSize}
          />
        </Link>
      }
    />
  )
}

export { Home }

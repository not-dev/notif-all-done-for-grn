import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

const FlexBox:React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' flex={1} {...props}>
      {children}
    </Box>
  )
}

export { FlexBox }

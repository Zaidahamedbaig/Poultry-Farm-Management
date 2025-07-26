import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface DrawerHeaderStyledProps extends BoxProps {
  open: boolean;
}

const DrawerHeaderStyled = styled(Box, { 
  shouldForwardProp: (prop) => prop !== 'open' 
})<DrawerHeaderStyledProps>(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(0),
  ...(open && {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(3)
  })
}));

export default DrawerHeaderStyled;
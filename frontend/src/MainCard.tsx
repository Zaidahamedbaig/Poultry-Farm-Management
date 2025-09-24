import React, { ForwardedRef, ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { SxProps, Theme } from '@mui/material/styles';

// Define the props type
interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  subheader?: ReactNode | string;
  content?: boolean;
  contentSX?: SxProps<Theme>;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: ReactNode;
  shadow?: string;
  sx?: SxProps<Theme>;
  title?: ReactNode | string;
  modal?: boolean;
  [key: string]: any; // to accept ...others like onClick, id, etc.
}

// Card header styles
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': {
    m: '0px auto',
    alignSelf: 'center'
  }
};

// ForwardRef for ref support
const MainCard = React.forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      modal = false,
      ...others
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Card
        elevation={elevation || 0}
        sx={[
          (theme) => ({
            position: 'relative',
            border: border ? '1px solid' : 'none',
            borderRadius: 1,
            borderColor: 'grey.A800',
            boxShadow: boxShadow && !border ? shadow || theme.shadows[1] : 'inherit',
            ':hover': {
              boxShadow: boxShadow ? shadow || theme.shadows[1] : 'inherit'
            },
            ...(modal && {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: `calc(100% - 50px)`, sm: 'auto' },
              maxWidth: 768,
              '& .MuiCardContent-root': {
                overflowY: 'auto',
                minHeight: 'auto',
                maxHeight: `calc(100vh - 200px)`
              }
            })
          }),
          sx
        ]}
        ref={ref}
        {...others}
      >
        {/* Card header */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}

        {/* Divider */}
        {title && divider && <Divider />}

        {/* Card content */}
        {content ? <CardContent sx={contentSX}>{children}</CardContent> : children}
      </Card>
    );
  }
);

export default MainCard;

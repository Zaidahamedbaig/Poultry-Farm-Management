import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';

export default function LogoSection({ reverse, isIcon, sx, to }:any) {
  return (
    <ButtonBase disableRipple component={Link} to={to} sx={sx}>
      {isIcon ? <LogoIcon /> : <Logo  />}
    </ButtonBase>
  );
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };

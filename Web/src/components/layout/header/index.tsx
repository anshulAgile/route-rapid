import { Link } from 'react-router-dom';

import { ROUTES } from '../../../utils/constants/routes';
import { toAbsoluteUrl } from '../../../utils/functions';

import { Wrapper } from './style';

const Header = () => {
  return (
    <Wrapper className="header">
      <div className="container-fluid">
        <div className="headerWrap">
          <div className="logo">
            <Link to={ROUTES.police}>
              <img src={toAbsoluteUrl('/images/logo.svg')} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;

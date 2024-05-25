import { LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../utils/constants/routes';
import { toAbsoluteUrl } from '../../../utils/functions';

import { Wrapper } from './style';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <div>Logout</div>,
    icon: <LogoutOutlined />
  }
];

const Header = () => {
  return (
    <Wrapper className="header">
      <div className="container-fluid">
        <div className="headerWrap">
          <div className="logo">
            <Link to={ROUTES.admin}>
              <img src={toAbsoluteUrl('/images/logo.svg')} alt="logo" />
            </Link>
          </div>
          <div className="header-right">
            <Dropdown menu={{ items }}>
              <figure>
                <img src={toAbsoluteUrl('/images/user-placeholder.jpg')} alt="logo" />
              </figure>
            </Dropdown>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;

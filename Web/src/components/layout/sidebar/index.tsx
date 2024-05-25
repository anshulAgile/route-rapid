import { useCallback, useMemo, useState } from 'react';

import { Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../utils/constants/routes';


import { authStore } from '../../../services/store/auth';
import Button from '../../common/Button';
import { AdminIcon, Driver } from '../../svg';
import { StyledLayout } from '../Layout.Styled';
import DeleteModal from '../../../components/common/Modal/DeleteModal';

function createMenuItem(
  link?: string,
  label?: string,
  key?: any,
  icon?: any,
  children?: any,
  type?: any
) {
  return {
    link,
    key,
    icon,
    children,
    label,
    type
  };
}

const items = [
  createMenuItem(
    ROUTES.police,
    'Police',
    '1',
    <Link to={ROUTES.police}>
      <AdminIcon />
    </Link>
  ),
  createMenuItem(
    ROUTES.driver,
    'Driver',
    '2',
    <Link to={ROUTES.driver}>
     <Driver />
    </Link>
  )
];

function compareLinkAndReturnKey(items: any, currentPath: any): any {
  let activeLinkKey;
  for (const item of items) {
    if (item?.children && Array.isArray(item?.children) && item.children.length > 0) {
      activeLinkKey = compareLinkAndReturnKey(item.children, currentPath);
      if (activeLinkKey) {
        break;
      }
    } else if (
      item.link === currentPath ||
      item.link === currentPath.split('/').splice(0, 3).join('/')
    ) {
      activeLinkKey = item.key;
      break;
    } else {
      continue;
    }
  }
  return activeLinkKey;
}
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { actions } = authStore((state) => state);

  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const activeTab = useMemo(() => {
    const activeLinkKey = compareLinkAndReturnKey(items, location?.pathname);
    if (activeLinkKey) {
      return [activeLinkKey];
    } else {
      return [
        items?.find((item) => item?.link?.split('/')[1] === location?.pathname?.split('/')[1])
          ?.key ?? '1'
      ];
    }
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    actions.authFail();
  }, [ navigate]);

  return (
    <StyledLayout.Sider width={'276px'}>
      <Menu
        className="sidebarMenu"
        defaultSelectedKeys={activeTab}
        selectedKeys={activeTab}
        mode="inline"
        onClick={({ item }: any) => navigate(item.props.link)}
        items={items}
      />
      <div className="logout-btn-wrap">
        <Button
          className="logout-btn primary-normal-btn"
          type="primary"
          size="middle"
          onClick={() => setIsLogoutModal(true)}
        >
          Log Out
        </Button>
      </div>
      <DeleteModal
        open={isLogoutModal}
        modalTitle="You are about to logout"
        modalDesc="Are you sure you want to do this?"
        onOk={handleLogout}
        onCancel={() => setIsLogoutModal(false)}
        confirmBtn="Logout"
      />
    </StyledLayout.Sider>
  );
};

export default Sidebar;

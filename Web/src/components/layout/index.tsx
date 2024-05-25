import { Suspense, lazy } from 'react';

import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import { Loader } from '../common/loader';
import { StyledLayout } from './Layout.Styled';
import Sidebar from './sidebar';

const Header = lazy(() => import('./header'));

const Layout = () => {
  return (
    <StyledLayout hasSider className="siteWrap">
      <Header />
      <StyledLayout className="siteLayout">
        <Sidebar />
        <Content>
          <div className="content-body">
            <div className="content-wrap">
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </Content>
      </StyledLayout>
    </StyledLayout>
  );
};

export default Layout;

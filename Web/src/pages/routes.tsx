import { lazy } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '../utils/constants/routes';

const Layout = lazy(() => import('../components/layout'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const SignIn = lazy(() => import('./Auth/Modules/SignIn'));
const AuthGuard = lazy(() => import('../components/common/AuthGuard'));
const Police = lazy(() => import('./Police'));
const Driver = lazy(() => import('./Driver'));

const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.signIn} element={<SignIn />} />
      <Route
        path={ROUTES.default}
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path={ROUTES.pageNotFound} element={<PageNotFound />} />
        <Route path={ROUTES.police} element={<Police />} />
        <Route path={ROUTES.driver} element={<Driver />} />
        {/* <Route path={ROUTES.analytics} element={<Analytics />} /> */}
        <Route path={ROUTES.default} element={<Navigate replace to={ROUTES.police} />} />
        <Route path="*" element={<Navigate replace to={ROUTES.pageNotFound} />} />
      </Route>
      <Route path="*" element={<Navigate replace to={ROUTES.default} />} />
    </Routes>
  );
};

export default Routing;

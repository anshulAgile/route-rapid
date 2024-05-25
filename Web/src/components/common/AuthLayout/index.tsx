import { ReactNode } from 'react';

import { Col, Row } from 'antd';

import AuthBranding from '../../../pages/Auth/Components/AuthBranding';
import { AuthWrapper } from './Auth.Styled';

export interface IAuthProps {
  containerClassName?: string;
  authBg?: string;
  title?: string;
  children?: ReactNode;
}
const AuthLayout = (props: IAuthProps) => {
  const { containerClassName, children } = props;
  return (
    <AuthWrapper className={`authLayout ${containerClassName || ''}`}>
      <Row className="layout-row">
        <Col sm={12} className="layout-form">
          <div className="header-logo">
            <a href="#">
              <img src="images/auth-logo.svg" alt="logo" />
            </a>
          </div>
          {children}
        </Col>
        <AuthBranding />
      </Row>
      {/* <div className={`authWrapper ${!authBg ? 'authBg' : authBg}`}>{children}</div> */}
    </AuthWrapper>
  );
};

export default AuthLayout;

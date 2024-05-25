import { Col } from 'antd';

import { toAbsoluteUrl } from '../../../utils/functions';

const AuthBranding: React.FC = () => {
  return (
    <Col sm={12} className="auth-branding-wrap">
      <div className="auth-branding">
        <img src={toAbsoluteUrl('/images/brand-banner2.svg')} alt="" />
      </div>
    </Col>
  );
};

export default AuthBranding;

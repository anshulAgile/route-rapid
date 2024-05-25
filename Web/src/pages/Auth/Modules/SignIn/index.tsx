import { useCallback } from 'react';

import { Col, Form, Row } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../../utils/constants/routes';
import { toastMessage } from '../../../../utils/functions';

import AuthLayout from '../../../../components/common/AuthLayout';
import Button from '../../../../components/common/Button';
import { RenderPasswordInput, RenderTextInput } from '../../../../components/common/FormField';

import { ISignInReq } from 'services/api/auth/types';
import { IApiError } from 'utils/Types';
import { authAPI } from '../../../../services/api/auth';
import { authStore } from '../../../../services/store/auth';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isLoggedIn, actions } = authStore((state) => state);

  const onSubmit = useCallback(
    (data: ISignInReq) => {
      authAPI
        .signIn(data)
        .then((res) => {
          console.log('res: ', res.result);
            actions.authSuccess(res?.result);
            navigate(ROUTES.police);
        })
        .catch((err:IApiError) => {
          toastMessage('error', err?.responseException?.exceptionMessage);
        });
    },
    [actions, navigate]
  );

 

  if (isLoggedIn) {
    return <Navigate to={ROUTES.police} />;
  }

  return (
    <>
      <AuthLayout>
        <Form
          onFinish={onSubmit}
          form={form}
          autoComplete="off"
          className="auth-form"
        >
          <h2 className="auth-title">Welcome Back</h2>
          <Row className="auth-form-row">
            <RenderTextInput
              col={{ xs: 24 }}
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
              size="large"
              rules={[
                {
                  required: true,
                  message: 'Please enter email.'
                },
                {
                  type: 'email',
                  message: 'Please enter valid email.'
                }
              ]}
            />
            <RenderPasswordInput
              col={{ xs: 24 }}
              name="password"
              required={true}
              placeholder="Password"
              label="Password"
              type="password"
              size="middle"
              rules={[
                {
                  required: true,
                  message: 'Please enter your password.'
                }
              ]}
            />
            <Col xs={24}>
              <Button
                block={true}
                type="primary"
                size="middle"
                htmlType="submit"
                className="auth-next-btn"
              >
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </AuthLayout>
    </>
  );
};

export default SignIn;

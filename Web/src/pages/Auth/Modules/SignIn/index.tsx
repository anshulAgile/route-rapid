import { useCallback, useState } from 'react';

import { Col, Form, Row } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../../utils/constants/routes';
import { toastMessage } from '../../../../utils/functions';

import AuthLayout from '../../../../components/common/AuthLayout';
import Button from '../../../../components/common/Button';
import { RenderPasswordInput, RenderTextInput } from '../../../../components/common/FormField';

import { authAPI } from '../../../../services/api/auth';
import { authStore } from '../../../../services/store/auth';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isLoggedIn, actions } = authStore((state) => state);
  const [isFormValid, setIsFormValid] = useState(false);

  const onSubmit = useCallback(
    (data: any) => {
      authAPI
        .signIn(data)
        .then((res: any) => {
          if (res?.data?.user_type === 1) {
            actions.authSuccess(res);
            navigate(ROUTES.admin);
            toastMessage('success', res?.message);
          } else {
            toastMessage('error', 'This email is not linked with any admin account, please check.');
          }
        })
        .catch((err) => {
          toastMessage('error', err?.message);
        });
    },
    [actions, navigate]
  );

  const onFieldsChange = (_: any, allFields: any) => {
    const isValid = allFields.every((field: any) => field.errors.length === 0 && field.value);
    setIsFormValid(isValid);
  };

  if (isLoggedIn) {
    return <Navigate to={ROUTES.admin} />;
  }

  return (
    <>
      <AuthLayout>
        <Form
          onFinish={onSubmit}
          form={form}
          autoComplete="off"
          className="auth-form"
          onFieldsChange={onFieldsChange}
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
                disabled={!isFormValid}
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

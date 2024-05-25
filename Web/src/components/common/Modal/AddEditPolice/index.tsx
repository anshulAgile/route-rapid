import { ChangeEvent } from 'react';

import { Col, Form, Row, Space } from 'antd';

import { phoneNumberValidator } from '../../../../utils/functions';

import Button from '../../Button';
import { RenderPasswordInput, RenderPhoneNumber, RenderTextInput } from '../../FormField';
import { CommonModalStyle } from '../Modal.Styled';
import { IModalProps } from '../types';

const AddEditPolice = ({
  open,
  handleFinish,
  onCancel,
  width,
  modalTitle,
  form,
  phoneNumber,
  setPhoneNumber
}: IModalProps) => {
 
 
  return (
    <CommonModalStyle
      width={width ?? 650}
      open={open}
      onOk={form.submit}
      onCancel={onCancel}
      centered={true}
      className="product-modal"
      footer={null}
    >
      <h2 className="modal-title">{modalTitle}</h2>
      <Form form={form} onFinish={handleFinish} >
        <Row>
          <Col xs={24} className="row-col-fields">
            <RenderTextInput
              col={{ xs: 11, md: 11 }}
              name="firstName"
              type="text"
              placeholder="First Name"
              label="First Name"
              rules={[
                () => ({
                  validator: (_: any, value: string) => {
                    if (!value) {
                      return Promise.reject(new Error('Please enter first name.'));
                    } else if (/^$|\s+/.test(value.trim())) {
                      return Promise.reject(new Error('First name cannot contain blank spaces.'));
                    } else if (!/.{2,}/.test(value)) {
                      return Promise.reject(new Error('First name at least contain 2 letters.'));
                    } else {
                      return Promise.resolve();
                    }
                  }
                })
              ]}
            />
            <RenderTextInput
              col={{ xs: 11, md: 11 }}
              name="lastName"
              type="text"
              placeholder="Last Name"
              label="Last Name"
              rules={[
                () => ({
                  validator: (_: any, value: string) => {
                    if (!value) {
                      return Promise.reject(new Error('Please enter last name.'));
                    } else if (/^$|\s+/.test(value.trim())) {
                      return Promise.reject(new Error('Last name cannot contain blank spaces.'));
                    } else if (!/.{2,}/.test(value)) {
                      return Promise.reject(new Error('Last name at least contain 2 letters.'));
                    } else {
                      return Promise.resolve();
                    }
                  }
                })
              ]}
            />
          </Col>
          <RenderPhoneNumber
            col={{ xs: 24 }}
            label="Phone Number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            format={'(###) ###-####'}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              form?.setFieldValue('phoneNumber', e?.target?.value);
              setPhoneNumber(e?.target?.value);
            }}
            rules={[
              {
                validator: (_: any, value: any) => phoneNumberValidator({ value })
              }
            ]}
          />
          <Row>
            <Col xs={24} className="row-col-fields">
              <RenderTextInput
                col={{ xs: 11, md: 11 }}
                name="licenseNumber"
                type="number"
                placeholder="Licence Number"
                label="LICENCE NUMBER"
              />
              <RenderTextInput
                col={{ xs: 11, md: 11 }}
                name="age"
                type="number"
                placeholder="Age"
                label="AGE"
              />
            </Col>
          </Row>
              <RenderPasswordInput
                col={{ xs: 24, md: 24 }}
                name="password"
                type="password"
                placeholder="Password"
                label="Password"
                rules={
                  [
                    () => ({
                      validator: (_: any, value: string) => {
                        if (!value) {
                          return Promise.reject(new Error('Please enter your password.'));
                        } else if (/^$|\s+/.test(value)) {
                          return Promise.reject(
                            new Error('Password cannot contain blank spaces.')
                          );
                        } else if (
                          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/.test(
                            value
                          )
                        ) {
                          return Promise.reject(
                            new Error(
                              'Password must contain at least 8-16 alphanumeric characters.'
                            )
                          );
                        } else {
                          return Promise.resolve();
                        }
                      }
                    })
                  ]
                }
              />
              <RenderPasswordInput
                col={{ xs: 24, md: 24 }}
                name="repeatpassword"
                type="password"
                placeholder="Repeat Password"
                label="Repeat Password"
                rules={ [
                  {
                    required: true,
                    message: 'Please enter confirm password.'
                  },
                  ({ getFieldValue }: any) => ({
                    validator(_: any, value: any) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Confirm password do not match with password.')
                      );
                    }
                  })
                ]
                }
              />
         
          <Space className="modal-footer-btn">
            <Button className="cancel-btn" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              className="primary-normal-btn"
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Space>
        </Row>
      </Form>
    </CommonModalStyle>
  );
};

export default AddEditPolice;

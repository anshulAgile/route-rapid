import { styled } from 'styled-components';

import { responsive } from '../../../style/Common/Mixin';
import { theme } from '../../../style/Theme';

export const AuthWrapper = styled.section`
  &.authLayout {
    height: 100vh;
    display: block;
    overflow: hidden;
    background: ${theme?.color?.white};
    .layout-row {
      height: 100%;
    }
    .layout-form {
      display: flex;
      align-items: center;
      flex-direction: column;
      overflow: hidden auto;
      height: 100%;
      padding: 30px;
      background-color: ${theme?.color?.white};
    }
    .auth-branding {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 40px 0 0 40px;
      background: ${theme?.color?.primary};
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .auth-form {
      margin: auto;
      max-width: 550px;
      &.photo-form {
        width: 550px;
      }
    }
    .upload-file {
      width: 100%;
      height: 175px;
      display: inline-block;
      margin-bottom: 25px;
      .ant-upload-drag {
        border: 2px dashed ${theme?.color?.gray3};
        .ant-upload-drag-container {
          p {
            font-size: 15px;
            font-weight: 400;
            line-height: 22px;
            color: ${theme?.color?.gray3};
            &.ant-upload-text {
              span {
                color: ${theme?.color?.lightGreen};
                border-bottom: 1px solid ${theme?.color?.lightGreen};
              }
            }
          }
        }
      }
    }
    .avatar-uploader {
      .ant-upload-list {
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
        .ant-upload-list-item-container {
          width: 200px;
          height: 200px;
          margin: 0 !important;
          .ant-upload-list-item {
            padding: 0 !important;
            &::before {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
        }
        .ant-upload {
          width: 200px;
          height: 200px;
          margin: 0;
          button {
            font-size: 17px;
            p {
              color: ${theme?.color?.gray3};
            }
            span {
              color: ${theme?.color?.primary};
              border-bottom: 1px solid ${theme?.color?.primary};
            }
          }
        }
        .ant-upload-select {
          border: 2px dashed ${theme?.color?.gray3};
        }
        button.ant-upload-list-item-action:hover {
          background: transparent;
        }
      }
    }
    .skip-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 20px auto 0;
      span {
        font-size: 17px;
        font-weight: 600;
        line-height: 20px;
        color: ${theme?.color?.primary};
        cursor: pointer;
      }
    }
    .header-logo {
      width: 100%;
      a {
        display: inline-block;
        width: 150px;
        height: 42px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .auth-title {
      font-size: 30px;
      font-weight: 600;
      line-height: 35px;
      color: ${theme?.color?.primary};
      text-align: center;
      margin-bottom: 35px;
    }
    .auth-desc {
      font-size: 17px;
      font-weight: 400;
      line-height: 22px;
      color: ${theme?.color?.gray4};
      text-align: center;
    }
    .auth-description {
      max-width: 450px;
      font-size: 17px;
      font-weight: 400;
      line-height: 22px;
      color: ${theme?.color?.gray4};
      text-align: center;
      margin: 0 auto 25px;
    }
    .auth-footer-link {
      width: 100%;
      margin-top: 100px;
    }
    .steps-label {
      width: 550px;
      display: inline-block;
      font-size: 15px;
      font-weight: 600;
      line-height: 17px;
      color: ${theme?.color?.primary};
      margin: 50px 0 30px;

      label {
        display: inline-block;
        margin-bottom: 35px;
      }
      span {
        color: ${theme?.color?.gray3};
      }
    }
    .row-fields {
      display: flex;
      justify-content: space-between;
    }
    .custom-number-input {
      background: ${theme?.color?.whiteShadow};
      border: 1px solid ${theme?.color?.primaryeLight};
      border-radius: 5px;
      padding: 13px;
      margin-bottom: 25px;
      .PhoneInputCountry {
        background: ${theme?.color?.primaryLight};
        border-radius: 18px;
        padding: 9px 18px;
        margin-right: 0;
        .PhoneInputCountryIcon {
          width: 16px;
          height: 11px;
          margin-right: 10px;

          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
      input {
        font-size: 17px;
        font-weight: 400;
        color: ${theme?.color?.primary};
        line-height: 20px;
        background: ${theme?.color?.transparent};
        margin-left: 10px;
      }
      ::placeholder {
        font-size: 17px;
        font-weight: 400;
        color: ${theme?.color?.primaryeLight};
        line-height: 20px;
      }
      &:focus-within {
        border: 1px solid ${theme?.color?.primary};
      }
    }
    .otp-wrap {
      width: 450px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 0 auto;
      .otp-label {
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        color: ${theme?.color?.primary};
        margin-bottom: 15px;
      }
      div {
        justify-content: space-between;
        width: 450px;
        .containerClass {
          width: 60px !important;
          height: 55px;
          border-radius: 5px;
          border: 1px solid ${theme?.color?.primaryeLight};
          font-size: 17px;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
    .resend-otp {
      width: 100%;
      text-align: center;
      margin: 25px 0;
      span {
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        color: ${theme?.color?.primary};
        cursor: pointer;

        &:hover {
          border-bottom: 1px solid ${theme?.color?.primary};
        }
      }
    }
  }

  ${responsive('md')`
      .layout-form{
        width: 100%;
        flex: 0 0 100%;
        max-width: 100%
      }
      .auth-branding-wrap{
        display: none !important; 
      }
      .header-logo{
        margin-bottom: 20px;
      }
      .auth-title{
          font-size: 24px !important;
          margin-bottom: 20px !important;
        }
        .auth-footer-link{
          margin-top: 80px !important;
        }
        .steps-label{
           margin: 30px 0 !important;
           label{
            margin-bottom: 25px !important;
           }
        }
  `}
`;

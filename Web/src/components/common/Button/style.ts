import { Button } from 'antd';

import styled from 'styled-components';

import { responsive } from '../../../style/Common/Mixin';
import { theme } from '../../../style/Theme';

export const Wrapper = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  padding: 17px 16px;
  height: 48px;
  font-size: 14px;
  line-height: 20px;
  border-radius: 8px;
  &.w-160 {
    width: 160px;
  }
  /*--------------- VARIANTS ---------------*/
  /* Default Button */
  &.ant-btn-default {
    color: ${theme.color.primary};
    border: 1px solid ${theme.color.primary};
    background-color: ${theme.color.transparent};
    .ant-btn-icon:not(:last-child) {
      margin-inline-end: 10px;
      svg {
        width: 24px;
        height: 24px;
      }
    }
    &:not(:disabled):not(.ant-btn-disabled):hover {
      color: ${theme.color.white};
      background-color: ${theme.color.primary};
    }
  }

  /* delete-button */
  &.delete-btn {
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    color: ${theme?.color?.danger};
    border: 1px solid ${theme?.color?.danger};

    &:hover {
      color: ${theme?.color?.white};
      background: ${theme?.color?.danger} !important;
      border: 1px solid ${theme?.color?.danger} !important;
    }
  }

  /* Primary Button */
  &.ant-btn-primary {
    background-color: ${theme.color.primary};
    color: ${theme.color.white};
    border-radius: 6px;
    span {
      font-size: 17px;
      font-weight: 600;
      line-height: normal;
      color: ${theme?.color?.white};
    }
    &:not(:disabled):not(.ant-btn-disabled):hover {
      background-color: ${theme.color.primary};
      color: ${theme.color.white};
      border-color: ${theme.color.primary};
    }
    &:disabled {
      color: ${theme.color.gray};
      background-color: rgba(46, 112, 232, 0.6) !important;
      border-color: ${theme.color.grayLight};
    }
    &.primary-normal-btn {
      width: 180px;
    }
  }

  &.btn-disable {
    background: ${theme?.color?.primaryeLight} !important;
    border: none !important;
  }

  &.ant-btn-text {
    padding: 0;
    margin: 0;
    height: auto;
    border: none;
    &:not(:disabled):not(.ant-btn-disabled):hover {
      background-color: transparent;
    }
  }

  &.cancel-btn {
    border: none;
    width: 180px;
    &:hover {
      background: transparent !important;
      span {
        color: ${theme?.color?.primaryActive};
      }
    }
    span {
      font-size: 17px;
      font-weight: 600;
      line-height: normal;
      color: ${theme?.color?.primary};
    }
  }

  &.auth-next-btn {
    height: auto;
    padding: 19px 150px !important;
  }

  &.notification-btn {
    border-radius: 5px;
    padding: 8px 33px;
    height: auto;
    span {
      font-weight: 500;
      font-size: 17px;
    }
    &:first-of-type {
      margin-right: 6px;
      border: 1px solid ${theme?.color?.primaryLight};
    }
  }

  /*--------------- SIZES ---------------*/
  &.ant-btn-lg {
    padding: 14px 16px;
    height: 56px;
    font-size: 16px;
    line-height: 24px;
    .ant-btn-icon:not(:last-child) {
      margin-inline-end: 12px;
      svg {
        width: 28px;
        height: 28px;
      }
    }
  }

  &.ant-btn-sm {
    padding: 10px 16px;
    height: 40px;
    font-size: 14px;
    line-height: 18px;
    .ant-btn-icon:not(:last-child) {
      margin-inline-end: 8px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  &.add-button {
    min-width: 75px;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    background: ${theme?.color?.secondary};
    color: ${theme?.color?.white};
    border: none;

    &.export-button {
      min-width: 110px;
      svg {
        margin-right: 8px;
      }
    }
    &:hover {
      background: ${theme?.color?.secondary} !important;
    }
  }
  ${responsive('xs')`
    height: 46px;
    &.ant-btn-lg {
      padding: 12px 16px;
      height: 46px;
      font-size: 14px;
      line-height: 20px;
      .ant-btn-icon:not(:last-child) {
        margin-inline-end: 12px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  `}
`;

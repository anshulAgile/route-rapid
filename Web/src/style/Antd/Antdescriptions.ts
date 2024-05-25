import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';

export const AntDescriptions = createGlobalStyle`
  .ant-descriptions {
    + .ant-descriptions {margin-top: 24px;}
    .ant-descriptions-header {
      background: ${theme?.color?.primaryLight};
      padding: 16px;
      border-radius: 6px;
    }
    .ant-descriptions-row .ant-descriptions-item {
      padding-bottom: 8px;
    }
    .ant-descriptions-title {
      font-size: 21px;
      font-weight: 600;
      line-height: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ant-descriptions-item-label {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      margin-top: 10px;
      color: ${theme?.color?.grayLight};
      &::after {
        content: none;
      }
    }
    .ant-descriptions-item-content {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: ${theme?.color?.black};
      margin-bottom: 0;
      flex-wrap: wrap;
      row-gap: 8px;
    }
  }
`;

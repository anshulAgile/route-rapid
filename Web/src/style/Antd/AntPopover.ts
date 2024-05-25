import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';

export const AntPopover = createGlobalStyle`
  .ant-popover{
    .ant-popover-arrow{
      display: none;
    }
    .ant-popover-inner{
      min-width: 165px;
      border-radius: 7px;
      background-color: ${theme?.color?.white};
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.20);
      padding: 0;
    }
    .ant-popover-inner-content{
      display: flex;
      flex-direction: column;
      a{
        button{
          width: 100%;
        }
      }
      .ant-btn{
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        color : ${theme?.color?.label};
        border-radius: 0;
        padding: 14px 0;
        &:hover{
          background-color: #ededed;
          color: ${theme?.color?.primaryActive};
        }
        &.deleteBtn{
          color:  ${theme?.color?.danger};
        }
      }
    }
  }
`;

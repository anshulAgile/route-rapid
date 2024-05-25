// import { theme } from 'style/Theme';
import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';

export const AntTable = createGlobalStyle`

    .customTable{
      border-radius: 8px;
      overflow: hidden;

      table{
        .ant-table-thead{
          background: ${theme?.color?.white};
          th{
            font-size: 12px;
            font-weight: 600;
            line-height: 30px;
            color: ${theme?.color?.primaryActive};
            background: ${theme?.color?.transparent};
            &::before{
              display: none;
            }
          }
        }
        .ant-table-tbody{
          tr{
            &.ant-table-row-selected{
              .ant-table-cell{
                background: ${theme?.color?.transparent} !important;
              }
            }
            &:nth-of-type(even){
              background: ${theme?.color?.whiteShadow};
            }
            &:hover{
              background: ${theme?.color?.transparent};
            }
            td{
              font-size: 14px;
              font-weight: 400;
              line-height: 22px;
              color: ${theme?.color?.gray1};
              &:first-of-type{
                font-weight: 500;
                color: ${theme?.color?.primaryActive};
              }
              &:last-of-type{
                text-align: end;
              }
            }
          }
        }
      }

      &.scanHistoryTable{
        table{
          .ant-table-tbody{
            tr td:last-of-type{
              text-align: start; 
            }
          }
        }
      }
    }

    .ant-pagination{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 25px;
      height: 50px;
      padding-right: 8px;
      font-size: 14px !important;
      li{
        &.ant-pagination-simple-pager{
          font-size: 14px !important;
          font-weight: 400 !important;
          line-height: normal !important;
          color: ${theme?.color?.primaryActive} !important;
          .ant-select-selector{
            span{
            font-size: 14px !important;
            font-weight: 500 !important;
            line-height: normal !important;
            color: ${theme?.color?.primaryActive} !important;
          }
          input{
            font-size: 14px !important;
            font-weight: 500 !important;
            line-height: normal !important;
            color: ${theme?.color?.primaryActive} !important;
          }
        }
        }
      }
    }
`;

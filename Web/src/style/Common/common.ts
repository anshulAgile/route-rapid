import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';

export const Common = createGlobalStyle`

    .container-fluid {
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
    }

    .container {
        width: 100%;
        max-width: 1230px;
        padding-left: 15px;
        padding-right: 15px;
        margin: 0 auto;

        &.lg {
            width: 1290px;
        }

        &.md {
            width: 908px;
        }
    }

    .commonHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;

        h2{
            font-size: 24px;
            font-weight: 700;
            color: ${theme?.color?.primaryActive};
        }

        .header-btn-grp{
            display: flex;
            align-items: center;
            button:last-of-type{
                margin-left: 20px;
            }
        }
    }

    .shadow-paper {
        height: 100%;
        margin-bottom: 30px;

        &.auto-height {
            height: auto;
        }

        .shadow-paper-scroll {
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
            margin: 0 -20px;
            padding: 0 20px;
        }

        +.shadow-paper {
            margin-top: 20px;
        }

        &.no-bg{
            background-color: transparent;
        }

        &.pad-sm{
            padding: 10px 20px;
        }

        &.pad-md{
            padding: 15px 20px;
        }

        &.no-padd {
            padding: 0;
        }

        .heading-row {
            padding: 20px 0;
        }
    }

    .white-paper {
        background: ${theme?.color?.white};
        padding: 16px;
        border-radius: 8px;
        + .white-paper {
            margin-top: 16px;
        }
    }

    /* Text Alignment */
    .text-center {
        text-align: center;
    }

    .text-left {
        text-align: left;
    }

    .text-right {
        text-align: right;
    }

    /* Text Colors */
    .text-success {
        color: ${theme?.color?.success};
    }

    .text-danger {
        color: ${theme?.color?.danger};
    }

    .text-warning {
        color: ${theme?.color?.warning};
    }

    .text-info {
        color: ${theme?.color?.info};
    }

    /* Width & Height */
    .w-100 {
        width: 100%;
    }

    .max-w-100 {
        max-width: 100%;
    }

    .h-100 {
        height: 100%;
    }

    .h-100vh {
        min-height: 100vh;
    }

    .forgot-link {
        display: inline-block;
        text-align: right;
        font-weight: 500;
    }
    
    .signin-link {
        display: inline-block;
        text-align: left;
        line-height: 1.28;
        margin-bottom: 24px;
        font-weight: 500;
    }

    .layout-header-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
        .ant-dropdown-menu-title-content {
           padding: 8px;
        }
        .anticon {
            margin: 0 10px 0 8px;
            font-size: 16px;
        }
    }
    a.ant-breadcrumb-link {
        color: ${theme?.color?.secondary} !important;
        background: transparent !important;
    }

    /* cuestions-card css... */
    .question-mark-card {
        height: 100%;
        .ant-card-head {
            padding: 0 12px;
        }
        .ant-card-body {
            padding: 12px;
            p {
                font-size: 15px;
                span.opt {
                    color: ${theme?.color?.grayDark};
font-size: 13px;
font-weight: 400;
line-height: 20px;
                }
            }
        }
        .ant-card-head-title {
            color: ${theme?.color?.primary};
font-size: 16px;
font-weight: 600;
line-height: 20px;
        }
    }
    /* ...cuestions-card css */
`;

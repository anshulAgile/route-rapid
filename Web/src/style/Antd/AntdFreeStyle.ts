import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';

export const AntdFreeStyle = createGlobalStyle`
/* Antd submenu open in popup style start */
    .ant-menu-submenu.ant-menu-submenu-popup > .ant-menu {
        .ant-menu-item .anticon,
        .ant-menu-submenu-title .anticon {
            * {
            fill: ${theme?.color.white};
            color: ${theme?.color.white};
            }
        }
        .ant-menu-item-active,
        .ant-menu-item-selected {
            .anticon {
            * {
                fill: ${theme?.color.primary};
                color: ${theme?.color.primary};
                }
            }
        }
    }
    /* Antd submenu open in popup style end */
  /* Ant tag css start */
    .ant-tag {
        line-height: 28px;
        padding-inline: 16px;
        border-radius: 4px;
        cursor: pointer;
    }
    /* Ant tag css over */

    /* Ant form field css start */
    .ant-form-item {
        .ant-form-item-label {
            label{
                font-size: 16px;
                font-weight: 600;
                line-height: 20px;
                height: auto;
                &::after{
                    display: none;
                }
            }
            > label.ant-form-item-required:not(.ant-form-item-required-mark-optional) {
                &::before {
                    content: none;
                }
            }
        }
        &.phoneNumberInput{
            .addOnBefore{
                img{
                    width: 25px;
                    height: 25px;
                }
            }
        .ant-form-item-control-input{
            box-sizing: border-box;
            margin: 0;
            padding: 12.5px 11px;
            color: #30484C !important;
            font-size: 17px !important;
            line-height: 1;
            list-style: none;
            position: relative;
            display: inline-block;
            width: 100%;
            background-color: #FBFAF9;
            border: 1px solid #DEE2E6;
            border-radius: 5px;
            transition: all 0.2s;
            .ant-form-item-control-input-content{
                background: transparent !important;
            }
            .ant-space-compact{
                background: transparent !important;
            }
            
            .addOnBefore{
                padding-inline-end: 6px;
            }
            input{
                color: inherit;
                font-size: inherit;
                font-family: ${theme?.font?.family?.montserrat};
                background: transparent !important;
            }
        }
        &.ant-form-item-has-error{
            .ant-form-item-control-input{
                border-color: #bb0b00;
            }    
        }
        &.inputWithPrefix{
            .ant-form-item-control-input{
                .ant-form-item-control-input-content{
                    display: inline-flex;
                    align-items: center;
                    width: 100%;
                }
                input{
                    width: 100%;
                }
            }
        }
    }
    }
    .custom-label {
        position: relative;
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        height: 33px;
        color: #343a40;
        font-size: 14px;
    }
    .ant-picker {
        width: 100%;
    }
    /* Ant form field css over */
    /* Ant collapse css start */
    .ant-collapse {
        border: 0;
        .ant-collapse-item {
            border: 0;
            .ant-collapse-header {
                align-items: center;
                background: #E7F2F9;
                border-radius: 8px !important;
            }
            +.ant-collapse-item {
                margin-top: 8px;
            }
        }
        .ant-collapse-content {
            border: 0;
        }
        .ant-collapse-content-box {
            .ant-collapse-item {
                .ant-collapse-header {
                    background: #F4F8FB;
                }
            }
        }
    }
    /* Ant collapse css over */
    
    /* Ant button css start */
    .ant-btn span.anticon[role="img"] {
        display: inline-flex;
    }
    /* Ant button css over */

    .ant-form-item-control-input{
        .ant-form-item-control-input-content{
            height: 100%;
        }
        .ant-input-password{
            border: 1px solid ${theme?.color?.primaryLight};
            background: ${theme?.color?.whiteShadow};
            border-radius: 5px;
            input{
                font-size: 16px !important;
            font-weight: 400;
            line-height: 20px;
            color: ${theme?.color?.label};
            }
            &:hover{
                border: 1px solid ${theme?.color?.primaryLight};
                background: ${theme?.color?.whiteShadow};
            }
            &:focus-within{
                border: 1px solid ${theme?.color?.primary};
                background: ${theme?.color?.whiteShadow};
            }
        }
        .input-field{
            height: 100%;
            font-size: 16px !important;
            font-weight: 400;
            line-height: 20px;
            color: ${theme?.color?.label} !important;
            border: 1px solid ${theme?.color?.grayBorder};
            background: ${theme?.color?.transparent};
            border-radius: 10px;

            &:hover{
                border: 1px solid ${theme?.color?.primaryLight};
                background: ${theme?.color?.whiteShadow};
            }
            &:focus-within{
                border: 1px solid ${theme?.color?.primary};
                background: ${theme?.color?.whiteShadow};
            }
        }
        ::placeholder{
            font-size: 17px;
            font-weight: 400;
            line-height: 20px;
            color: ${theme?.color?.gray};
        }
        textarea{
            border: 1px solid ${theme?.color?.grayBorder};
            border-radius: 10px;
            font-size: 16px !important;
            font-weight: 400;
            line-height: 20px;
            color: ${theme?.color?.label} !important;
            border: 1px solid ${theme?.color?.grayBorder};
            background: ${theme?.color?.transparent};
            resize: none;
            &:hover{
                border: 1px solid ${theme?.color?.primaryLight};
            }
        }
        .ant-select{
            &.ant-select-single{
                min-height: 55px;
            }
            &:hover{
                .ant-select-selector{
                    border-color: ${theme?.color?.primaryLight} !important;
                }
            }
            .ant-select-selector{
                border: 1px solid ${theme?.color?.primaryLight};
                background: ${theme?.color?.whiteShadow};
                border-radius: 5px;
                padding-top: 8px;
                padding-bottom: 8px;
            }
            .ant-select-selection-placeholder{
                font-size: 17px;
                font-weight: 400;
                line-height: normal;
                color: ${theme?.color?.primaryeLight};
                left: 12px;
            }
            .ant-select-selection-search{
                width: 100%;
                margin: 0;
            }
            &.ant-select-focused .ant-select-selector,
            .ant-select-selector:focus,
            .ant-select-selector:active,
            .ant-select-open .ant-select-selector {
                border-color: ${theme?.color?.primaryLight} !important;
                box-shadow: none !important;
            }
        }
    }
`;

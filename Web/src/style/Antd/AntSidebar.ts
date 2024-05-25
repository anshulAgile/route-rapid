import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';

export const AntSidebar = createGlobalStyle`
  .ant-layout-sider{
    .ant-menu{
        li{
            &.ant-menu-item{
                width: 100%;
                border-radius: 0;
                margin: 0;
                background: ${theme?.color?.white};
                padding-left: 60px !important;
                span{
                    font-size: 15px;
                    font-weight: 700;
                    line-height: 24px;
                    color: ${theme?.color?.gray3};
                    margin-left: 20px;
                }
                &:hover,&.ant-menu-item-selected.ant-menu-item-active{
                    background: ${theme?.color?.whiteShadow} !important;
                    svg path{
                        fill: ${theme?.color?.primaryActive};
                    }
                    span{
                        color: ${theme?.color?.primaryActive};
                    }
                }
                &:nth-of-type(9){
                    border-bottom: 1px solid ${theme?.color?.primaryLight};
                    margin-bottom: 15px;
                    padding-bottom: 24px;
                }
            }
            &.ant-menu-submenu{
                border-radius: 0;
                padding-left: 60px !important;
                background: ${theme?.color?.white};
                &.ant-menu-submenu-selected{
                    .ant-menu-submenu-title{
                        .ant-menu-title-content{
                            color: ${theme?.color?.primaryActive};
                        }
                        svg path{
                            fill: ${theme?.color?.primaryActive};
                        }
                        .ant-menu-submenu-arrow{
                            color: ${theme?.color?.primaryActive};
                        }
                    }
                }
                  .ant-menu-submenu-title{
                    padding-left: 0 !important;
                    margin: 0;
                    &:hover{
                        background: ${theme?.color?.transparent};
                        span.ant-menu-title-content{
                             color: ${theme?.color?.primaryActive};
                        }
                    }
                }
                .ant-menu-title-content{
                    margin-left: 20px;
                    font-size: 15px;
                    font-weight: 700;
                    line-height: 24px;
                    color: ${theme?.color?.gray3};
                }
                .ant-menu-submenu-arrow{
                    color: ${theme?.color?.gray3};
                }
                &:hover{
                    background: ${theme?.color?.whiteShadow} !important;
                    svg path{
                        fill: ${theme?.color?.primaryActive};
                    }
                    .ant-menu-submenu-arrow{
                        color: ${theme?.color?.primaryActive};
                    }
                }
            }
        } 
        &.ant-menu-sub{
            position: relative;
            background: red !important;
            margin-left: 8px;
            &::after{
                content: '';
                position: absolute;
                left: 0px;
                top: 0;
                width: 1px;
                height: 100%;
                background: ${theme?.color?.gray3};
            }
            li{
                background: ${theme?.color?.white};
                padding: 0 !important;
                .ant-menu-title-content{
                    margin-left: 29px !important;
                }
            }
        }
    }
    .ant-menu-item-selected{
        background: ${theme?.color?.whiteShadow} !important;
                svg path{
                    fill: ${theme?.color?.primaryActive};
                }
                span{
                    color: ${theme?.color?.primaryActive} !important;
                }
                .ant-menu-submenu-arrow{
                    color: ${theme?.color?.primaryActive};
                }
            }
}
`;

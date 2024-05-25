// import { theme } from 'style/Theme';
import { Layout } from 'antd';

import { styled } from 'styled-components';

import { theme } from '../../style/Theme';

export const StyledLayout = styled(Layout)`
  margin-top: 68px;
  height: calc(100vh - 68px);
  &.ant-layout {
    &.siteWrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      .siteLayout {
        width: 100%;
      }
      .ant-layout {
        margin-top: 0;
      }
    }
    /* Sidebar */
    .ant-layout-sider {
      position: fixed;
      left: 0;
      z-index: 9900;
      min-height: calc(100vh - 68px);
      .ant-menu {
        &.sidebarMenu {
          height: calc(100vh - 280px);
          overflow: auto;
        }
      }
      .ant-layout-sider-trigger {
        height: var(--footerHeight);
        line-height: var(--footerHeight);
      }
    }
    /* Header */
    .ant-layout-header {
      height: var(--headerHeight);

      .header-title {
        /* text-align: left; */
        font-weight: 400;
        font-size: 20px;
        line-height: 26px;
        color: ${theme?.color?.black};
      }

      .profile-avatar {
        padding: 8px;
        border: 1px solid ${theme?.color?.black};
        background-color: ${theme?.color?.white};
      }
    }

    /* Content */
    .ant-layout-content {
      height: var(--bodyHeight);
      overflow: auto;
    }
    /* Footer */
    .ant-layout-footer {
      height: var(--footerHeight);
      text-align: center;
    }
    .logout-btn-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 25px;
      button {
        width: 180px;
      }
    }
    .content-body {
      padding: 30px;
      margin-left: 300px;
    }
  }
`;

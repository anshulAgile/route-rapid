import styled from 'styled-components';

import { theme } from '../../../style/Theme';

export const Wrapper = styled.div`
  &.header {
    width: 100%;
    position: fixed;
    top: 0;
    background-color: ${theme?.color?.primary};
    padding: 13px 0;
    z-index: 9900;
    .headerWrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 60px 0 0;
      .logo {
        display: inline-block;
        padding: 0 60px;

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
    }
    .header-right {
      figure {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }
`;

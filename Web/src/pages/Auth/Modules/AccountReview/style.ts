import { styled } from 'styled-components';

import { theme } from '../../../../style/Theme';

export const Wrapper = styled.div`
  .review-account-wrap {
    width: 100%;
    height: calc(100vh - 68px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .review-account {
    max-width: 650px;
    text-align: center;
    h1 {
      font-size: 30px;
      font-weight: 600;
      line-height: 35px;
      color: ${theme?.color?.primary};
      margin: 40px 0 30px;
    }
    p {
      font-size: 17px;
      font-weight: 400;
      line-height: 26px;
      color: ${theme?.color?.gray4};
    }
  }
`;

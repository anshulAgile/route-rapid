import styled from 'styled-components';

import { theme } from '../../../style/Theme';

export const Wrapper = styled.div`
  text-align: center;
  p {
    font-size: 17px;
    font-weight: 700;
    color: ${theme?.color?.primary};
    margin: 15px 0px;
  }
`;

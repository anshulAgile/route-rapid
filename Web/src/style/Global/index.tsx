import { Typography } from 'antd';

import AntdStyle from '../Antd';
import { Spacing } from '../Common/Spacing';
import { Common } from '../Common/common';
import { Reset } from '../Common/reset';

const GlobalStyle = () => {
  return (
    <>
      <Common />
      <Reset />
      <Spacing />
      <Typography />
      <AntdStyle />
    </>
  );
};

export default GlobalStyle;

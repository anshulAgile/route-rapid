import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';

export const AntDatePicker = createGlobalStyle`
&.ant-picker{
    color: ${theme?.color?.placeHolderGray};
    border: 1px solid ${theme?.color?.primaryLight};
    padding: 16px 12px;
    height: auto;
    background: ${theme?.color?.whiteShadow};
    border-radius: 5px;
    &:hover{
        border: 1px solid ${theme?.color?.primaryLight};
        background: ${theme?.color?.whiteShadow};
    }
    .ant-picker-input{
        input{
            font-size: 17px;
            font-weight: 400;
            color: ${theme?.color?.primaryActive};
            line-height: normal; 
        }
        ::placeholder{
            font-size: 17px;
            font-weight: 400;
            color: ${theme?.color?.primaryeLight} !important;
            line-height: normal; 
        }
    }
}

`;

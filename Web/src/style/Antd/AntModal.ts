import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';

export const AntModal = createGlobalStyle`
    .ant-modal-root {
        .ant-modal-centered{
            z-index: 9909 !important;
        }
        .ant-modal-mask{
            z-index: 9901 !important;
        }
        .ant-modal-confirm {
            .ant-modal-confirm-body >.anticon {
                font-size: 18px;
                .ant-modal-confirm-title {
                    color: ${theme?.color?.black};
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 1.1;
                }
            }
            .ant-modal-confirm-content {
                line-height: 1.4;
            }
        }
    }
`;

import { Modal } from 'antd';

import { styled } from 'styled-components';

import { theme } from '../../../style/Theme';

export const CommonModalStyle = styled(Modal)`
  .ant-modal-content {
    padding: 40px 30px 30px;
    border-radius: 16px;
    .ant-modal-close {
      &:hover {
        background-color: transparent;
      }
    }
  }
  .ant-modal-header,
  .modal-header {
    margin-bottom: 16px;
    .ant-modal-title,
    .modal-title {
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px;
      color: var(--dark-color);
    }
  }
  .ant-modal-body,
  .modal-body {
    .modal-text {
      color: var(--dark-color);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      &.bold {
        font-weight: 600;
      }
    }
    .modal-subtitle {
      color: var(--dark-color);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      &.bold {
        font-weight: 600;
      }
    }
    .picture-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .ant-modal-footer,
  .modal-footer {
    width: 100%;
    margin-top: 30px;
  }
  .modal-title {
    margin-bottom: 25px;
  }
  .row-col-fields {
    display: flex;
    justify-content: space-between;
  }
  .modal-footer-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .availability {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${theme?.color?.primaryLight};
    padding-top: 20px;
    margin-bottom: 30px;
    &.bussiness-hour {
      border: none;
    }
    label {
      display: flex;
      width: 100%;
      font-size: 22px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 20px;
    }
    ul.availabilityList {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      li.availabilityListItem {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .available-day {
          width: 30%;
          .day {
            font-size: 15px;
            font-weight: 500;
            color: ${theme?.color?.primary};
            margin-left: 25px;
          }
        }
        .available-hours {
          width: 70%;
          .working-hours {
            width: 100%;
            display: flex;
            align-items: center;
            .ant-picker {
              background: ${theme?.color?.whiteShadow};
              border: 1px solid ${theme?.color?.primaryLight};
              border-radius: 5px;
              padding: 6px 12px;
              &:focus-within {
                border: 1px solid ${theme?.color?.primary};
              }
              .ant-picker-input {
                align-items: center;
                input {
                  font-size: 17px;
                  font-weight: 400;
                  color: ${theme?.color?.primary};
                  line-height: 20px;
                }
                ::placeholder {
                  font-size: 17px;
                  font-weight: 400;
                  color: ${theme?.color?.primaryeLight};
                  line-height: 20px;
                }
              }
            }
            span.interval {
              font-size: 15px;
              font-weight: 500;
              line-height: normal;
              color: ${theme?.color?.primary};
              margin: 0 15px;
            }
          }
          .holiday-hour {
            display: flex;
            align-items: center;
            background: ${theme?.color?.lightBg};
            padding: 10px 15px;
            border-radius: 5px;
            svg {
              width: 18px;
              height: 18px;
            }
            h5 {
              font-size: 15px;
              font-weight: 400;
              color: ${theme?.color?.primaryeLight};
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
`;

export const ModalWrapper = styled(Modal)`
  &.ant-modal {
    &.text-center {
      text-align: center;
    }
    &.common-modal {
      ${CommonModalStyle}
      &.welcome {
        .ant-modal-content {
          padding: 30px;
        }
        .modal-header {
          margin-bottom: 20px;
          .modal-title {
            font-size: 40px;
            line-height: 44px;
            text-transform: uppercase;
          }
        }
        .ant-modal-body {
          .modal-subtitle {
            margin-top: 20px;
          }
          .picture-wrapper {
            margin-bottom: 23px;
          }
        }
      }

      &.list-modal {
        .listWrapper {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          .listTitle {
            margin-bottom: 8px;
            padding-inline-start: 16px;
            position: relative;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px;
            text-transform: uppercase;
            color: var(--dark-color);
            &::before {
              content: '';
              position: absolute;
              width: 6px;
              height: 6px;
              background-color: var(--theme-color);
              border-radius: 50%;
              left: 0;
              top: 0;
              bottom: 0;
              margin: auto 0;
            }
          }
          .listDesc {
            padding-inline-start: 16px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            color: var(--dark-color);
          }
        }
      }

      &.create-tag {
        .ant-modal-content {
          padding: 30px;
        }
        .modal-header {
          margin-bottom: 10px;
        }
        .ant-modal-body {
          .picture-wrapper {
            margin-bottom: 30px;
          }
        }
      }

      &.success-modal {
        text-align: center;
        .ant-modal-content {
          padding: 44px 30px 30px;
        }
        .ant-modal-header {
          margin-bottom: 10px;
        }
        .ant-modal-body {
          .modal-text {
            .houseNo {
              text-transform: uppercase;
            }
          }
          .picture-wrapper {
            margin-bottom: 20px;
          }
        }
      }

      &.save-tag {
        .ant-modal-content {
          padding: 30px;
        }
        .picture-wrapper {
          margin-bottom: 30px;
        }
        .modal-header {
          margin-bottom: 10px;
        }
      }

      &.verify-link {
        .ant-modal-content {
          padding: 30px;
        }
        .picture-wrapper {
          margin-bottom: 30px;
        }
        .modal-header {
          margin-bottom: 10px;
        }
      }

      &.view-all-tags {
        .ant-modal-content {
          padding: 0;
          min-height: 570px;
          .ant-modal-header {
            padding: 40px 16px 20px;
            border-bottom: 1px solid #e3e3e3;
          }
          .ant-modal-body {
            padding: 16px;
          }
        }
      }
    }
  }
  &.delete-modal {
    .ant-modal-close {
      display: none;
    }
    .content-wrapper {
      .picture-wrapper {
        display: inline-block;
        margin-bottom: 30px;
      }
      h2.modal-title {
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
        color: ${theme?.color?.black};
        margin-bottom: 10px;
      }
      p.modal-subtitle {
        font-size: 17px;
        line-height: 24px;
        font-weight: 500;
        color: ${theme?.color?.gray1};
        margin-bottom: 40px;
      }
    }
    .delete-btn-grp {
      display: flex;
      align-items: center;
      button:first-of-type {
        margin-right: 15px;
      }
    }
  }
`;

import { Button } from 'antd';

import { Warning } from '../../../svg';
import { ModalWrapper } from '../Modal.Styled';
import { IModalProps } from '../types';

const DeleteModal = ({
  open,
  onOk,
  onCancel,
  width,
  modalTitle,
  modalDesc,
  confirmBtn
}: IModalProps) => {
  return (
    <ModalWrapper
      width={width ?? 500}
      open={open}
      // onOk={onOk}
      onCancel={onCancel}
      centered={true}
      className="common-modal delete-modal text-center"
      footer={[
        <div key={3} className="delete-btn-grp">
          <Button
            onClick={onCancel}
            type="default"
            htmlType="button"
            className="w-100"
            size="middle"
          >
            Cancel
          </Button>
          <Button onClick={onOk} type="primary" htmlType="button" className="w-100" size="middle">
            {confirmBtn}
          </Button>
        </div>
      ]}
    >
      <div className="content-wrapper">
        <picture className="picture-wrapper">
          <Warning />
        </picture>
        <div className="modal-header">
          <h2 className="modal-title">{modalTitle}</h2>
        </div>
        <p className="modal-subtitle text-center">{modalDesc}</p>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;

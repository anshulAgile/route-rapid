import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Empty, Form, Table } from 'antd';

import { toastMessage } from '../../utils/functions';

import Button from '../../components/common/Button';

import { IApiError } from 'utils/Types';
import AddEditPolice from '../../components/common/Modal/AddEditPolice';
import { policeAPI } from '../../services/api/user';
import { ICreatePoliceReq } from '../../services/api/user/type';
import { keys } from '../../services/hooks/queryKeys';
import { usePoliceList } from '../../services/hooks/user';
import { Wrapper } from './style';

const Police = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isAddEditAdminModal, setIsAddEditAdminModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const { data } = usePoliceList();

  const handleAddEditFormCancel = () => {
    setIsAddEditAdminModal(false);
    form.resetFields();
  };

  const handleAddEditFormSubmit =
    (values: any) => {
      const payload :ICreatePoliceReq= {
        firstname: values?.firstName.trim(),
        lastName: values?.lastName.trim(),
        password: values?.password,
        licenceNumber: values?.licenseNumber,
        age: Number(values?.age),
        role: "police",
        mobileNo: values?.phoneNumber?.replace(/\D/g, ''),
        latitude: null,
        longitude: null
      };
        policeAPI
          .createPolice(payload)
          .then((_res: any) => {     
            toastMessage('success', "Police created successfully");
            queryClient.invalidateQueries(keys.police);
            setIsAddEditAdminModal(false);
            form.resetFields();
            setPhoneNumber('');
          })
          .catch((err:IApiError) => {
            toastMessage('error', err?.responseException?.exceptionMessage);
          });
          
    }
  

  const columns = [
    {
      title: 'FIRST NAME',
      dataIndex: 'firstName',
      width: 50
    },
    {
      title: 'LAST NAME',
      dataIndex: 'lastName',
      width: 50
    },
    {
      title: 'MOBILE NUMBER',
      dataIndex: 'mobileNumber',
      width: 150,
    },
    {
      title: 'LICENCE NUMBER',
      dataIndex: 'licenceNumber',
      width: 50
    },
    {
      title: 'AGE',
      dataIndex: 'age',
      width: 50
    },
  ];


  return (
    <>
      <Wrapper className="product">
        <div className="container-fluid">
          <div className="commonHeader">
            <h2>Police</h2>
            <div className="header-btn-grp">
              <Button type="primary" onClick={() => setIsAddEditAdminModal(true)}>
                Create Police
              </Button>
            </div>
          </div>
          <div className="customTable">
            <Table
              columns={columns}
              scroll={{ x: 700 }}
              dataSource={data?.result ?? []}
              rowKey="id"
              locale={{
                emptyText: (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Police available" />
                )
              }}
            />
          </div>
        </div>
      </Wrapper>
      <AddEditPolice
        open={isAddEditAdminModal}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        modalTitle={ 'Add Police'}
        form={form}
        handleFinish={handleAddEditFormSubmit}
        onCancel={handleAddEditFormCancel}
      />
    </>
  );
};

export default Police;

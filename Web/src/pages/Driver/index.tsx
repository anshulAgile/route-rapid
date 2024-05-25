import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Empty, Form, Table } from 'antd';


import Button from '../../components/common/Button';

import { IApiError } from 'utils/Types';
import AddDriver from '../../components/common/Modal/AddDriver';
import { policeAPI } from '../../services/api/user';
import { ICreatePoliceReq } from '../../services/api/user/type';
import { keys } from '../../services/hooks/queryKeys';
import { useDriverList } from '../../services/hooks/user';
import { toastMessage } from '../../utils/functions';
import { Wrapper } from '../Police/style';

const Driver = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isAddEditAdminModal, setIsAddEditAdminModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
 
  const { data } = useDriverList();

  useEffect(() => {
    const paginationSearch: any = document.querySelector('.ant-select-selection-search');

    if (paginationSearch) {
      paginationSearch.style.display = 'none';
    }
  }, []);

  const handleAddEditFormSubmit = useCallback(
    (values: any) => {
      console.log('values: ', values);
      const payload:ICreatePoliceReq = {
        firstname: values?.firstName.trim(),
        lastName: values?.lastName.trim(),
        password: values?.password,
        mobileNo: values?.phoneNumber?.replace(/\D/g, ''),
        age: values?.age,
        latitude: values?.latitude,
        longitude: values?.longitude,
        licenceNumber: values?.licenseNumber,
        role: 'driver'
      };
      policeAPI
      .createPolice(payload)
      .then((_res: any) => {
        toastMessage('success', "Driver created successfully");
        queryClient.invalidateQueries(keys.driver);
        setIsAddEditAdminModal(false);
        form.resetFields();
        setPhoneNumber('');
      })
      .catch((err:IApiError) => {
        toastMessage('error', err?.responseException?.exceptionMessage);
      });
    },
    [queryClient]
  );

  const handleAddEditFormCancel = () => {
    setIsAddEditAdminModal(false);
  };

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
            <h2>Driver</h2>
            <div className="header-btn-grp">
              <Button type="primary" onClick={() => setIsAddEditAdminModal(true)}>
                Add
              </Button>
            </div>
          </div>
          <div className="customTable">
            <Table
              columns={columns}
              pagination={false}
              scroll={{ x: 700 }}
              dataSource={data?.result ?? []}
              rowKey="id"
              locale={{
                emptyText: (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No admin available" />
                )
              }}
            />
          </div>
        </div>
      </Wrapper>
      <AddDriver
        open={isAddEditAdminModal}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        modalTitle={'Add Driver'}
        form={form}
        handleFinish={handleAddEditFormSubmit}
        onCancel={handleAddEditFormCancel}
      />

    </>
  );
};

export default Driver;

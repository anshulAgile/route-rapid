import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Empty, Form, Pagination, Popover, Table } from 'antd';

import { debounce, formatPhoneNumber, toastMessage } from '../../utils/functions';

import Button from '../../components/common/Button';
import { RenderTextInput } from '../../components/common/FormField';
import AddEditAdmin from '../../components/common/Modal/AddEditAdmin';
import DeleteModal from '../../components/common/Modal/DeleteModal';
import { DotsIcon, LeftIcon, RightIcon, SearchIcon } from '../../components/svg';

import { adminAPI } from '../../services/api/admin';
import { useAdminList } from '../../services/hooks/admin';
import { adminKeys } from '../../services/hooks/queryKeys';
import { Wrapper } from './style';

const Police = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isAddEditAdminModal, setIsAddEditAdminModal] = useState(false);
  const [isDeleteAdminModal, setIsDeleteAdminModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [adminId, setAdminId] = useState(0);
  const [adminData, setAdminData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [args, setArgs] = useState({
    search: '',
    ordering: '',
    page: 1,
    size: 10
  });

  const { data } = useAdminList(args);

  useEffect(() => {
    const paginationSearch: any = document.querySelector('.ant-select-selection-search');

    if (paginationSearch) {
      paginationSearch.style.display = 'none';
    }
  }, []);

  const handleAddEditFormSubmit = useCallback(
    (values: any) => {
      const payload = {
        first_name: values?.firstName.trim(),
        last_name: values?.lastName.trim(),
        email: values?.email,
        password: values?.password,
        country_code: '+1',
        mobile: values?.phoneNumber?.replace(/\D/g, '')
      };
      if (isEdit) {
        adminAPI
          .editAdmin(payload, adminId)
          .then((res: any) => {
            toastMessage('success', res?.message);
            queryClient.invalidateQueries(adminKeys.adminList(args));
            setIsAddEditAdminModal(false);
            form.resetFields();
            setIsEdit(false);
            setAdminData({});
            setPhoneNumber('');
          })
          .catch((err) => {
            toastMessage('error', err?.message);
          });
      } else {
        adminAPI
          .addAdmin(payload)
          .then((res: any) => {
            toastMessage('success', res?.message);
            setArgs((prev) => {
              return { ...prev, page: 1 };
            });
            queryClient.invalidateQueries(adminKeys.adminList({ ...args, page: 1 }));
            setIsAddEditAdminModal(false);
            form.resetFields();
            setPhoneNumber('');
          })
          .catch((err) => {
            toastMessage('error', err?.message);
          });
      }
    },
    [args, queryClient, adminId]
  );

  const handleDeleteAdmin = useCallback(
    async (id: number, data: any) => {
      try {
        const res = await adminAPI.deleteAdmin(id);
        toastMessage('success', res?.message);
        if (data?.data?.length === 1 && args?.page !== 1) {
          setArgs((prev) => {
            return { ...prev, page: prev.page - 1 };
          });
          queryClient.invalidateQueries(adminKeys.adminList({ ...args, page: args?.page - 1 }));
        } else {
          queryClient.invalidateQueries(adminKeys.adminList(args));
        }
      } catch (err: any) {
        toastMessage('error', err?.message);
      }
      setIsDeleteAdminModal(false);
    },
    [args, queryClient]
  );

  const handleAddEditFormCancel = () => {
    setIsAddEditAdminModal(false);
    setIsEdit(false);
    form.resetFields();
    setAdminData({});
  };

  const handleSearhChange = (e: any) => {
    setArgs((prev) => {
      return { ...prev, page: 1, search: e.target.value };
    });
  };

  const debouceSearchHandler = debounce(handleSearhChange, 500);

  const handlePagination = (page: number, pageSize: number) => {
    setArgs((prev) => {
      return { ...prev, page: page, size: pageSize };
    });
  };

  const handleDeleteModalOpen = (id: number) => {
    setIsDeleteAdminModal(true);
    setAdminId(id);
  };

  const handleEditModalOpen = async (id: number) => {
    try {
      const res = await adminAPI.getAdmin(id);
      setAdminData(res);
    } catch (err) {
      console.log('err: ', err);
    }
    setAdminId(id);
    setIsEdit(true);
    setIsAddEditAdminModal(true);
  };

  const columns = [
    {
      title: 'FIRST NAME',
      dataIndex: 'first_name',
      width: 50
    },
    {
      title: 'LAST NAME',
      dataIndex: 'last_name',
      width: 50
    },
    {
      title: 'MOBILE NUMBER',
      dataIndex: 'mobile',
      width: 50,
      render: (text: string) => {
        return <div>{formatPhoneNumber(text)}</div>;
      }
    },
    {
      title: 'LICENCE NUMBER',
      dataIndex: 'email',
      width: 50
    },
    {
      title: 'AGE',
      dataIndex: 'age',
      width: 50
    },
    {
      title: 'CITY',
      dataIndex: 'city',
      width: 50
    },
    {
      title: 'LATITUDE',
      dataIndex: 'latitude',
      width: 50
    },
    {
      title: 'LONGITUDE',
      dataIndex: 'longitude',
      width: 50
    },
    {
      title: ' ',
      dataIndex: 'action',
      key: 'action',
      width: 50,
      render: (_text: string, value: any) => {
        return (
          <Popover placement="bottomRight" content={() => getContent(value?.id)} trigger="click">
            <Button type="link">
              <DotsIcon />
            </Button>
          </Popover>
        );
      }
    }
  ];

  const getContent = (id: number) => {
    return (
      <>
        {/* <Button type="link" onClick={() => handleEditModalOpen(id)}>
          Edit
        </Button> */}
        <Button type="link" className="deleteBtn" onClick={() => handleDeleteModalOpen(id)}>
          Delete
        </Button>
      </>
    );
  };

  return (
    <>
      <Wrapper className="product">
        <div className="container-fluid">
          <div className="commonHeader">
            <h2>Police</h2>
            <div className="header-btn-grp">
              <Button type="primary" onClick={() => setIsAddEditAdminModal(true)}>
                Add
              </Button>
            </div>
          </div>
          <div className="commonSearch">
            <RenderTextInput
              colClassName="commonSearchInput"
              name="search"
              placeholder="Search Police"
              prefix={<SearchIcon />}
              onChange={debouceSearchHandler}
            />
          </div>
          <div className="customTable">
            <Table
              columns={columns}
              pagination={false}
              scroll={{ x: 700 }}
              dataSource={data?.data ?? []}
              rowKey="id"
              locale={{
                emptyText: (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No admin available" />
                )
              }}
            />
            <Pagination
              simple
              onChange={handlePagination}
              current={args?.page}
              showSizeChanger={true}
              pageSizeOptions={['10', '20', '50', '100']}
              prevIcon={<LeftIcon />}
              nextIcon={<RightIcon />}
              total={data?.total_record}
            />
          </div>
        </div>
      </Wrapper>
      <AddEditAdmin
        open={isAddEditAdminModal}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        modalTitle={isEdit ? 'Edit Police' : 'Add Police'}
        form={form}
        formData={adminData}
        handleFinish={handleAddEditFormSubmit}
        onCancel={handleAddEditFormCancel}
      />

      <DeleteModal
        open={isDeleteAdminModal}
        modalTitle="You are about to delete an admin"
        modalDesc="Are you sure you want to do this? This action cannot be undone."
        onOk={() => handleDeleteAdmin(adminId, data)}
        onCancel={() => setIsDeleteAdminModal(false)}
        confirmBtn="Delete"
      />
    </>
  );
};

export default Police;

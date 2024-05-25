import { Breadcrumb } from 'antd';

const StyledBreadcrumb = ({ pathName }: any) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>{pathName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default StyledBreadcrumb;

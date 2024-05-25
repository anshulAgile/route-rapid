import { Wrapper } from './style';

export interface IDataNotFound {
  message: string;
}

const DataNotFound = (props: IDataNotFound) => {
  return (
    <Wrapper>
      <p>{props?.message}</p>
    </Wrapper>
  );
};

export default DataNotFound;

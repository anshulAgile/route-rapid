import { authStore } from '../../../services/store/auth';
import { LoadingIcon } from '../../svg';
import { Spinner, Wrapper } from './style';

interface IProps {
  children?: React.ReactNode;
  loading?: boolean;
}

export const LoaderWrapper: React.FC<IProps> = ({ children }) => {
  return <>{children}</>;
};

export const Loader: React.FC<IProps> = ({ children, loading }) => {
  const { isLoading } = authStore((state) => state);
  return (
    <>
      {isLoading || loading ? (
        <Wrapper>
          <Spinner>
            <LoadingIcon />
          </Spinner>
          {children}
        </Wrapper>
      ) : (
        children
      )}
    </>
  );
};

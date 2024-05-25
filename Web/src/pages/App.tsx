import { Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import { setupAxios } from '../utils/functions';

import { ErrorBoundary } from '../components/common/Error';
import { Loader, LoaderWrapper } from '../components/common/loader';

import ThemeConfig from '../style/Config';
import GlobalStyle from '../style/Global';
import Routes from './routes';

setupAxios();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default settings for all queries
      // cacheTime: 24  60  60 * 1000, // 24 hours
      // staleTime: 5  60  1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 0
    }
  }
});

const AppContainer = () => (
  <ThemeConfig>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <LoaderWrapper>
              <h6 style={{ textAlign: 'center' }}>Loading</h6>
            </LoaderWrapper>
          }
        >
          <Loader />
          <BrowserRouter>
            <GlobalStyle />
            <Routes />
          </BrowserRouter>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ErrorBoundary>
  </ThemeConfig>
);

export default AppContainer;

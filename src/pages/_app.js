import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

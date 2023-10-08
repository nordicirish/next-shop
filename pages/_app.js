import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.css";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  // Wrap the component in the QueryClientProvider
  // so all components in the app can use react-query
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
export default App;

import '../styles/globals.css';
import { Loader } from '@mantine/core';
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return <>{isLoading ? <Loader color='white' style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', marginTop: 100 }} /> : <Component {...pageProps} />}</>;
}

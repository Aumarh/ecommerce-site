import { css, Global } from '@emotion/react';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

const cookieBannerStyles = (isOpen) => css`
  height: ${isOpen ? '35px' : 0};
  overflow: hidden;
  transition: all 200ms ease-in;
`;

function MyApp({ Component, pageProps }) {
  const [areCookieAccepted, setAreCookieAccepted] = useState(false);

  function cookieBannerButtonHandler() {
    setLocalStorage('areCookiesAccepted', true);
    setAreCookieAccepted(true);
  }

  useEffect(() => {
    if (getLocalStorage('areCookiesAccepted')) {
      setAreCookieAccepted(getLocalStorage('areCookiesAccepted'));
    }
  }, []);

  return (
    <div>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          *,
          ::before,
          ::after {
            box-sizing: border-box;
          }
        `}
      />
      <div css={cookieBannerStyles(!areCookieAccepted)}>
        Cookie Banner
        <Button
          variant="contained"
          size="small"
          onClick={() => cookieBannerButtonHandler()}
        >
          Accept
        </Button>
      </div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;

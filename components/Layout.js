import { css } from '@emotion/react';
import { Container } from '@mui/material';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css`
  min-height: 82vh;
`;

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Fabric store</title>
        <meta
          name="description"
          content="A one stop shope for all your fabric options"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container css={mainStyles}>{children}</Container>
      <Footer />
    </div>
  );
}

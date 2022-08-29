import { css } from '@emotion/react';
import { Container } from '@mui/material';
import Head from 'next/head';
// import Cart from '../pages/cart';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css`
  min-height: 82vh;
`;

export default function Layout(props) {
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
      <Header
        productInCart={props.productInCart}
        setProductInCart={props.setProductInCart}
      />
      <Container css={mainStyles}>{props.children}</Container>
      <Footer />
    </div>
  );
}

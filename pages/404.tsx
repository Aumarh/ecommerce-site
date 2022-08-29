import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const pageStyles = css`
  height: 100vh;
  background-color: #a7b2f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    text-decoration: none;
    margin-top: 40px;
    font-family: cursive;
  }
`;

export default function WrongPage() {
  return (
    <div css={pageStyles}>
      <Head>
        <title> Fabric Shop 404 🤦 </title>
        <meta name="description" content="wrong page" />
      </Head>

      <h1>Oops! Looks like you got lost. </h1>
      <Link href="/">Back to the Fabric shop</Link>
    </div>
  );
}

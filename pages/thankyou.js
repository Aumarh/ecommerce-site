import { css } from '@emotion/react';
import { Button } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';

const paragraphStyles = css`
  font-family: cursive;
  font-weight: 600;
`;

export default function ThankYouPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Thank you for your order</title>
        <meta
          name="description"
          content="An assortment of different fabrics from around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 css={paragraphStyles}>Thank you for shopping with us</h1>
        <p>
          An email with your order and delivery details will be sent to your
          inbox.
        </p>
      </div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            router.push('/products').catch(() => {});
          }}
        >
          Continue shopping...
        </Button>
      </div>
    </>
  );
}

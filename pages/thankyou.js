import Head from 'next/head';

export default function ThankYouPage() {
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
        <h1>Thank you for ordering with us</h1>
        <p>You will receive an email with your order and delivery details.</p>
      </div>
    </>
  );
}

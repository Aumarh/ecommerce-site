import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fabrics</title>
        <meta
          name="description"
          content="An assortment of different fabrics from around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home page</h1>
      <div>
        <Link href="/" scroll={false}>
          Egyptian Cotton
        </Link>
        <Link href="/" scroll={false}>
          Silk
        </Link>
        <Link href="/" scroll={false}>
          Ankara
        </Link>
        <Link href="/" scroll={false}>
          Adire
        </Link>
      </div>
      <div>
        <div name="/">1</div>
        <div name="/">2</div>
        <div name="/">3</div>
        <div name="/">4</div>
      </div>
    </div>
  );
}

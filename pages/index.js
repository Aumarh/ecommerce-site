import Head from 'next/head';
import Hero from '../components/Hero';

// import Link from 'next/link';

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

      <Hero />
    </div>
  );
}

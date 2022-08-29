import { css } from '@emotion/react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { getAllFabrics } from '../util/database';

// export type Product = {
//   id: number;
//   slug: string;
//   name: string;
//   image?: string;
//   category: string;
//   price: number;
//   countInStock: number;
//   description: string;
// };

// type Props = {
//   Products: Product[];
// };

const productContainerStyles = css`
  margin-bottom: 40px;
`;

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Product Page</title>
        <meta
          name="description"
          content="An assortment of different fabrics from around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Product Page</h1>
        <Grid container spacing={3}>
          {props.products.map((product) => {
            // console.log(fabricDatabase);
            return (
              <Grid item md={4} key={`fabrics-${product.id}`}>
                <Card css={productContainerStyles}>
                  <Link href={`/product/${product.id}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={`/images/${product.id}.jpeg`}
                        title={product.category}
                      />
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions>
                    {/* €{product.price} */}
                    <Button variant="outlined" size="small" color="primary">
                      Add to favorites
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // console.log(fabricDatabase);
  const products = await getAllFabrics();

  return {
    props: {
      products: products,
    },
  };
}

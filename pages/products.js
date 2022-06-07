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
import fabricDatabase from '../util/database';

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
                <Card>
                  <Link href={`/product/${product.id}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
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

export function getServerSideProps() {
  // console.log(fabricDatabase);
  return {
    props: {
      products: fabricDatabase,
    },
  };
}

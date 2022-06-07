import { css } from '@emotion/react';
import { Button, Grid, List, ListItem, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import fabricDatabase from '../../util/database';

const sectionStyles = css`
  margin-top: 15px;
  margin-bottom: 15px;

  a {
    text-decoration: none;
  }
`;

const nameStyles = css`
  h1 {
    font-size: 1.6rem;
    font-weight: 400;
    margin: 1rem 0;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 400;
    margin: 1rem 0;
  }
`;

export default function Product(props) {
  if (!props.product) {
    return <div>Product Not Found</div>;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{props.product.name}</title>
          <meta
            description={props.product.description}
            content="About the products"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <div css={sectionStyles}>
        <Typography>
          <Link href="/products">back to products</Link>
        </Typography>
      </div>
      <div>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={props.product.image}
              alt={props.product.name}
              width={640}
              height={640}
              layout="responsive"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <List>
              <ListItem css={nameStyles}>
                <Typography>
                  <h1>{props.product.name}</h1>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {props.product.category}</Typography>
              </ListItem>
              {/* <ListItem>
                <Typography>Rating: {product.rating} stars</Typography>
              </ListItem> */}
              <ListItem>
                <Typography>
                  Description: {props.product.description}
                </Typography>
              </ListItem>

              <List>
                <ListItem>
                  <Typography>Price: €{props.product.price}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    Status:{' '}
                    {props.product.countInStock > 0
                      ? 'In stock'
                      : 'Not in stock'}
                  </Typography>
                </ListItem>
              </List>

              <ListItem>
                <Button variant="contained" color="primary">
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const product = fabricDatabase.find((product) => {
    return product.id === context.query.productId;
  });

  if (!product) {
    context.res.statusCode = 404;
  }
  return {
    props: {
      product: product || null,
    },
  };
}

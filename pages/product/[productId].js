import { css } from '@emotion/react';
import { ArrowBack } from '@mui/icons-material';
import { Button, Grid, List, ListItem, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
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
  const [isInFabric, setIsInFabric] = useState(
    'fabricCounter' in props.product,
  );
  const [fabricCounter, setFabricCounter] = useState(
    props.product.fabricCounter || 0,
  );

  // useEffect(() => {
  //   const currentFabric = Cookies.get('fabric')
  //     ? JSON.parse(Cookies.get('diet'))
  //     : [];
  //   if (
  //     currentFabric.find(
  //       (productInFabric) => props.product.id === productInFabric.id,
  //     )
  //   ) {
  //     setIsInFabric(true);
  //   } else {
  //     setIsInFabric(false);
  //   }
  // }, [props.product.id]);

  // useEffect(() => {
  //   const currentFabric = Cookies.get('fabric')
  //     ? JSON.parse(Cookies.get('fabric'))
  //     : [];
  //   const currentProductInFabric = currentFabric.find(
  //     (productInFabric) => props.product.id === productInFabric.id,
  //   );
  //   if (currentProductInFabric) {
  //     setFabricCounter(currentProductInFabric.fabricCounter);
  //   }
  // }, [props.product.id]);

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
          <Link href="/products">
            <ArrowBack />
          </Link>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const currentFabric = Cookies.get('fabric')
                      ? setStringifiedCookie('fabric')
                      : [];
                    let newFabric;
                    // let newFabric;
                    // console.log(currentFabric);
                    // if (currentFabric.find((id) => props.product.id === id)) {
                    //   newFabric = currentFabric.filter(
                    //     (id) => id !== props.product.id,
                    //   );
                    //   setIsInFabric(false);
                    // } else setIsInFabric(true);

                    if (
                      currentFabric.find(
                        (productInDiet) =>
                          props.product.id === productInDiet.id,
                      )
                    ) {
                      newFabric = currentFabric.filter(
                        (productInDiet) =>
                          productInDiet.id !== props.product.id,
                      );
                      setIsInFabric(false);
                      setFabricCounter(0);
                    } else {
                      newFabric = [
                        ...currentFabric,
                        { id: props.product.id, fabricCounter: 0 },
                      ];
                      setIsInFabric(true);
                    }

                    setStringifiedCookie('fabric', newFabric);
                  }}
                >
                  {/* {isInFabric ? 'Remove' : 'Add to cart'} */}
                  Add to cart
                </Button>
                {isInFabric ? (
                  <>
                    {fabricCounter}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setFabricCounter(fabricCounter + 1);
                        const currentFabric = Cookies.get('fabric')
                          ? getParsedCookie('fabric')
                          : [];

                        const currentProductInFabric = currentFabric.find(
                          (productInFabric) =>
                            props.product.id === productInFabric,
                        );

                        currentProductInFabric.fabricCounter += 1;

                        setStringifiedCookie('fabric', currentFabric);

                        Cookies.set('fabric', JSON.stringify([currentFabric]));
                      }}
                    >
                      +
                    </Button>
                  </>
                ) : (
                  ''
                )}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const currentFabric = JSON.parse(context.req.cookies.fabric || '[]');
  // console.log(currentFabric);

  const singleProduct = fabricDatabase.find((product) => {
    return product.id === context.query.productId;
  });

  const currentProductInFabric = currentFabric.find(
    (productInFabric) => singleProduct.id === productInFabric,
  );

  const superProduct = { ...singleProduct, ...currentProductInFabric };
  // console.log(singleProduct);
  // console.log(superProduct);

  // if (!singleProduct) {
  //   context.res.statusCode = 404;
  // }
  return {
    props: {
      product: superProduct,
    },
  };
}

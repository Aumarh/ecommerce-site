import { css } from '@emotion/react';
import { ArrowBack } from '@mui/icons-material';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getAllFabrics } from '../util/database';

// import { product } from './product/[productId]';

export const returnToStyles = css`
  margin-top: 50px;

  a {
    text-decoration: none;
  }
`;

export default function Cart(props) {
  // create a state to update the state of the quantities when + - is clicked
  const [productCarts, setProductCarts] = useState([]);
  const [sum, setSum] = useState(0);

  // useEffect to update the state of the quantities when + - is clicked, get the cookies and store them inside currentCart
  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setProductCarts(currentCart);
  }, []);

  // run over cookies in cart and calculate the quantity of each fabric
  let totalQuantity = 0;
  for (let i = 0; i < productCarts.length; i++) {
    totalQuantity += productCarts[i].quantity;
  }

  // run over cookies in cart and calculate the sum of the fabrics
  useEffect(() => {
    function calculateTotalSum() {
      let total = 0;
      productCarts.map((productCart) => {
        return (total +=
          props.product.find((product) => {
            return productCart.id === product.id;
          }).price * productCart.quantity);
      });
      setSum(total);
    }
    calculateTotalSum();
  }, [productCarts, props.product]);
  console.log(typeof price);

  console.log('this is props', props.product);

  // route checkout button to checkout page
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Shopping cart</title>
        <meta
          name="description"
          content="An assortment of different fabrics from around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div>
        <h1>Shopping Cart</h1>
      </div> */}
      <div>
        {/* <Grid container spacing={1}>
          <Grid item md={9} xs={12}> */}
        {productCarts.length === 0 ? (
          <Typography variant="h2">Your cart is empty!</Typography>
        ) : (
          <h1>Your cart</h1>
        )}
        <div>
          {productCarts.map((productCart) => {
            return (
              <div
                key={`cart-${productCart.id}`}
                data-test-id={`cart-product-${productCart.id}`}
              >
                <TableContainer>
                  <Table aria-label="Cart">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        {/* <TableCell>Price €</TableCell> */}
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={props.product.id}>
                        <TableCell>
                          <a href={`/product/${productCart.id}`}>
                            <Image
                              src={`/images/${productCart.id}.jpeg`}
                              alt={productCart.name}
                              width={50}
                              height={50}
                            />
                          </a>
                        </TableCell>
                        {/* <TableCell>{productCart.quantity}</TableCell> */}
                        <TableCell>{productCart.price}</TableCell>
                        <TableCell>{productCart.quantity}</TableCell>
                        <TableCell align="right">
                          <button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              const newCart = productCarts.find(
                                (product) => product.id === productCart.id,
                              );
                              newCart.quantity -= 1;
                              if (newCart.quantity < 0) {
                                newCart.quantity = 0;
                              }
                              setStringifiedCookie('cart', productCarts);
                              setProductCarts([...productCarts]);
                              // sets the setState in app.js

                              // props.setProductInCart(productCarts);
                              // console.log(
                              //   'this is products in cart',
                              //   props.productInCart,
                              // );
                            }}
                          >
                            -
                          </button>{' '}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              const newCart = productCarts.find(
                                (product) => product.id === productCart.id,
                              );
                              newCart.quantity -= 1;
                              if (newCart.quantity < 0) {
                                newCart.quantity = 0;
                              }
                              setStringifiedCookie('cart', productCarts);
                              setProductCarts([...productCarts]);
                              // sets the setState in app.js

                              // props.setProductInCart(productCarts);
                              // console.log(props.productInCart);
                            }}
                          >
                            +
                          </button>
                        </TableCell>
                        <TableCell align="right">
                          <button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              const newCart = productCarts.filter((product) => {
                                return product.id !== productCart.id;
                              });
                              setStringifiedCookie('cart', newCart);
                              setProductCarts(newCart);
                              // sets the setState in app.js

                              // props.setProductInCart(newCart);
                            }}
                          >
                            x
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            );
          })}
        </div>
        {/* </Grid>
        </Grid> */}
      </div>
      <div>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                {totalQuantity} {totalQuantity === 1 ? 'fabric' : 'fabrics'}{' '}
              </ListItem>
              <ListItem>
                <Typography>Total: €{sum}</Typography>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    router.push('/checkout').catch(() => {});
                  }}
                >
                  Checkout
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </div>
      <div css={returnToStyles}>
        <Link href="/products">
          <a>
            <ArrowBack className="arrow" /> to fabric shop
          </a>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // 1. get the object from the cookies in the database
  const productCart = await getAllFabrics();
  console.log('this is product', productCart);

  // 2. get the cookie from the request
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  console.log('this is cart', currentCart);

  // 3. get the object from the cookies in the database

  return {
    props: { currentCart: currentCart, product: productCart },
  };
}

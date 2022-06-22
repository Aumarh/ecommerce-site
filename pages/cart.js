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
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getFabricDatabase } from '../util/database';
import { product } from './product/[productId]';

export default function Cart(props) {
  // create a state to update the state of the quantities when + - is clicked
  const [productCart, setProductCart] = useState(props.foundFabrics);

  // const [cookieCart, setCookieCart] = useState(props.cookieCart);
  // const [totalPrice, setTotalPrice] = useState(props.totalPrice);
  // const [cartQuantity, setCartQuantity] = useState(props.productQuantity);

  const totalPrice = props.productCart.map((product) => {
    const fabricPrice = Number(product.price);
    const fabricCounter = Number(product.quantity);
    const fabricPriceTotal = fabricPrice * fabricCounter;
    return fabricPriceTotal;
  });

  // function handleDeleteProductFromCart(id) {
  //   const filterCart = cookieCart.filter((product) => product.id !== id);
  //   const updateCurrentCart = updateCart(filterCart, props.fabrics);
  //   setCurrentCart(updateCurrentCart);
  //   setCookieCart('cart', filterCart);
  //   setCookieCart(filterCart);
  // }

  // create add function to add total of one synth to total of the next synth to get a sum
  function add(accumulator, a) {
    console.log(`first total: ${accumulator}`);
    console.log(`next total: ${a}`);
    return accumulator + a;
  }

  // useEffect(() => {
  //   const updatePrice = calculateTotalCartPrice(currentCart);
  //   setTotalPrice(updatePrice);
  // }, [currentCart]);

  // adding total price values in array by reducing down to one sum
  // begins adding from first total price with 0
  const sum = totalPrice.reduce(add, 0);
  console.log(sum);

  // route checkout button to checkout page
  const router = useRouter();

  return (
    <div>
      <div>
        <Head>
          <title>Shopping cart</title>
          <meta
            name="description"
            content="An assortment of different fabrics from around the world"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <div>
        <h3>
          <Typography>Shopping Cart</Typography>
        </h3>
      </div>
      <div>
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            {productCart.length === 0 ? (
              <h1>
                <Typography>Cart is empty!</Typography>
              </h1>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price </TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={props.productId}>
                      <TableCell>
                        <Link href={`/product/${product.id}`} />
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                      </TableCell>
                      <TableCell>
                        <Link href={product.name} />
                      </TableCell>
                      <TableCell align="right">${product.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            const newQuantity =
                              product.quantity > 1 ? product.quantity - 1 : 1;

                            const updatedFabric = productCart.map((total) =>
                              total.id === product.id
                                ? { ...total, quantity: newQuantity }
                                : total,
                            );
                            setProductCart(updatedFabric);

                            // 1. get the cookie
                            const currentCart = getParsedCookie('cart');

                            // 2. get the fabric
                            const currentFabric = currentCart.find(
                              (productInCart) =>
                                product.id === productInCart.id,
                            );

                            // 3. update the quantity of fabrics
                            currentFabric.quantity > 1
                              ? (currentFabric.quantity -= 1)
                              : (currentFabric.quantity = 1);

                            // 4. set the new cookie
                            setStringifiedCookie('cart', currentCart);
                            props.setProductsInCookieCart(updatedFabric);
                          }}
                        >
                          -
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <TableCell align="right">{product.quantity}</TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            const newQuantity = product.quantity + 1;

                            const updatedFabric = productCart.map((total) =>
                              total.id === product.id
                                ? { ...total, quantity: newQuantity }
                                : total,
                            );
                            setProductCart(updatedFabric);

                            // 1. get the cookie
                            const currentCart = getParsedCookie('cart');

                            // 2. get the fabric
                            const currentFabric = currentCart.find(
                              (fabricInCart) => product.id === fabricInCart.id,
                            );

                            // 3. update the quantity of fabrics
                            currentFabric.quantity += 1;

                            // 4. set the new cookie
                            setStringifiedCookie('cart', currentCart);
                            props.setProductsInCookieCart(updatedFabric);
                          }}
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            product.quantity = 0;

                            const updatedProduct = productCart.filter(
                              (productRemove) => productRemove.quantity !== 0,
                            );

                            // 1. update the state
                            setProductCart(updatedProduct);

                            // 2. cookies begin
                            const currentCart = getParsedCookie('cart');

                            // 3. get the fabrics from the cookies
                            const currentFabric = currentCart.find(
                              (fabricInCart) => product.id === fabricInCart.id,
                            );

                            // 4. update the quantity to 0
                            currentFabric.quantity = 0;

                            // 5. create new cart
                            const updatedCart = currentCart.filter(
                              (currentFabricInCart) =>
                                currentFabricInCart.quantity !== 0,
                            );

                            // 6. set the new cookie update after deleting
                            props.setProductsInCookieCart(updatedCart);
                            setStringifiedCookie('cart', updatedCart);
                          }}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            ;
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography>
                  <p>Total: €{sum}</p>
                </Typography>
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
    </div>
  );
}

export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  console.log(currentCart);

  // 1. get the object from the cookies in the database
  const allFabrics = await getFabricDatabase();

  // 2. create array to store found synths in cookies
  const foundFabrics = [];

  // 3. query fabrics database to find the id of current  cart products
  for (const fabric of currentCart) {
    const fabricDatabase = allFabrics.find((fabricProduct) => {
      return fabricProduct.id === fabric.id;
    });
    if (!fabricDatabase) {
      context.res.statusCode = 404;
    }
    const superFabric = { ...fabricDatabase, ...fabric };

    foundFabrics.push(superFabric);
  }

  return {
    props: { foundFabrics: foundFabrics },
  };
}

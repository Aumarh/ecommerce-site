import { css } from '@emotion/react';
import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { returnToStyles } from '../pages/cart';
import { deleteCookie, getParsedCookie } from '../util/cookies';
import { getAllFabrics } from '../util/database';

const formStyles = css`
  li {
    margin: auto;
  }
`;

export default function Checkout(props) {
  const [productCarts, setProductCarts] = useState([]);
  const [sum, setSum] = useState(0);

  // get the cookies and store them inside currentCart
  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setProductCarts(currentCart);
  }, []);

  // run over cookies in cart and calculate the quantity
  let totalQuantity = 0;
  for (let i = 0; i < productCarts.length; i++) {
    totalQuantity += productCarts[i].quantity;
  }

  // calculate sum
  useEffect(() => {
    function calculateTotalSum() {
      let total = 0;
      productCarts.map((cartProduct) => {
        return (total +=
          props.product.find((product) => {
            return cartProduct.id === product.id;
          }).price * cartProduct.quantity);
      });
      setSum(total);
    }
    calculateTotalSum();
  }, [productCarts, props.product]);

  // resetting the form on submit
  const [infos, setInfos] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    creditCard: '',
    expirationDate: '',
    securityCode: '',
  });

  const set = (name) => {
    return ({ target: { info } }) => {
      setInfos((oldInfos) => ({ ...oldInfos, [name]: info }));
    };
  };

  // form submit links to thankyou page and cleans up the cookies in cart
  const onSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/thankyou';
    deleteCookie('cart');
  };

  // use router function to reroute to thank you page on click of the submit button
  // const router = useRouter();
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setStringifiedCookie('cart', []);
  //   props.setItemsInCookieCart([]);

  //   router.push('/thanks').catch(() => {});
  // };

  return (
    <div>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <main>
          <div>
            <div>
              <h3>Checkout</h3>
            </div>
            <div>
              {productCarts.map((productCart) => {
                return (
                  <div key={`cart-${productCart.id}`}>
                    <div>
                      <Image
                        data-test-id="product-image"
                        src={`/images/${productCart.id}.jpeg`}
                        width="70"
                        height="70"
                      />
                      <br />
                      {productCart.quantity}{' '}
                      {
                        props.product.find((product) => {
                          return productCart.id === product.id;
                        }).name
                      }
                      {productCart.quantity === 1 ? '' : 's'}
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <div>
                your cart contains {totalQuantity}{' '}
                {totalQuantity === 1 ? 'fabric' : 'fabrics'}
              </div>
              <div>
                total price: <span>{sum} €</span>
              </div>{' '}
            </div>
          </div>
          <div>
            <h4>Please Enter Your Information</h4>
          </div>
          <br />
          <div>
            <form onSubmit={onSubmit}>
              <div css={formStyles}>
                <ul>
                  <li>
                    <label>
                      <span>first name:</span>
                      <input
                        data-test-id="checkout-first-name"
                        value={infos.firstName}
                        onChange={set('firstName')}
                        required
                      />
                    </label>{' '}
                  </li>
                  <li>
                    <label>
                      <span> last name:</span>
                      <input
                        data-test-id="checkout-last-name"
                        value={infos.lastName}
                        onChange={set('lastName')}
                        required
                      />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>email:</span>
                      <input
                        type="email"
                        data-test-id="checkout-email"
                        value={infos.email}
                        onChange={set('email')}
                        required
                      />
                    </label>
                  </li>
                  <li>
                    {' '}
                    <label>
                      <span>address:</span>
                      <input
                        data-test-id="checkout-address"
                        value={infos.address}
                        onChange={set('address')}
                        required
                      />
                    </label>{' '}
                  </li>
                  <li>
                    {' '}
                    <label>
                      <span> city:</span>
                      <input
                        data-test-id="checkout-city"
                        value={infos.city}
                        onChange={set('city')}
                        required
                      />
                    </label>
                  </li>
                  <li>
                    {' '}
                    <label>
                      <span>postal code:</span>
                      <input
                        data-test-id="checkout-postal-code"
                        value={infos.postalCode}
                        onChange={set('postalCode')}
                        required
                      />
                    </label>
                  </li>
                  <li>
                    <label>
                      country:
                      <input
                        data-test-id="checkout-country"
                        value={infos.country}
                        onChange={set('country')}
                        required
                      />
                    </label>
                  </li>
                  <li>
                    {' '}
                    <label>
                      {' '}
                      <span>credit-card: </span>
                      <input
                        data-test-id="checkout-credit-card"
                        type="number"
                        value={infos.creditCard}
                        onChange={set('creditCard')}
                        maxLength={12}
                        required
                      />
                    </label>{' '}
                  </li>
                  <li>
                    <label>
                      <span>expiration date:</span>
                      <input
                        data-test-id="checkout-expiration-date"
                        type="number"
                        value={infos.expirationDate}
                        onChange={set('expirationDate')}
                        maxLength={12}
                        required
                      />
                    </label>
                  </li>
                  <li>
                    {' '}
                    <label>
                      <span> security code:</span>
                      <input
                        data-test-id="checkout-security-code"
                        value={infos.securityCode}
                        onChange={set('securityCode')}
                        type="password"
                        required
                      />
                    </label>
                  </li>
                  <br />{' '}
                </ul>
                {/* <div className="submitButtonStyles">
              <button data-test-id="checkout-confirm-order">Submit</button>
            </div> */}
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // css={buttonBuyStyle}
                    data-test-id="checkout-confirm-order"
                    onClick={() => {
                      deleteCookie('cart');

                      // props.setProductInCart([]);
                    }}
                  >
                    confirm
                  </Button>
                </div>
              </div>

              {/* <div className="checkoutInfo">
                <button data-test-id="checkout-confirm-order">Submit</button>
                <h4 className="cartStyles">
                  Total fabrics in cart are: {totalQuantity}
                </h4>
                <h3 className="sumStyles">Total sum is: {sum}</h3>
              </div> */}
            </form>
          </div>
        </main>
        <div css={returnToStyles}>
          <Link href="/products">
            <a>
              <ArrowBack className="arrow" /> to fabric shop
            </a>
          </Link>
        </div>{' '}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  console.log(currentCart);

  // get the object from the cookies in the database
  const product = await getAllFabrics();

  return {
    props: { currentCart: currentCart, product: product },
  };
}

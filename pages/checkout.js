import Head from 'next/head';
import { useRouter } from 'next/router';
import { setStringifiedCookie } from '../util/cookies';
import { getFabricDatabase } from '../util/database';

export default function Checkout(props) {
  console.log(props.foundProducts);
  const totalPrice = props.foundProducts.map((product) => {
    const fabricPrice = Number(product.price);
    const fabricCounter = Number(product.quantity);
    const fabricPriceTotal = fabricPrice * fabricCounter;
    return fabricPriceTotal;
  });

  console.log(totalPrice);

  function add(accumulator, a) {
    return accumulator + a;
  }

  const sum = totalPrice.reduce(add, 0);

  const totalQuantity = props.foundFabrics.map((productQuantity) => {
    const productCounterTwo = Number(productQuantity.quantity);
    return productCounterTwo;
  });
  console.log(totalQuantity);

  function addQ(acc, b) {
    return acc + b;
  }
  const summedQuantity = totalQuantity.reduce(addQ, 0);
  console.log(summedQuantity);

  // use router function to reroute to thank you page on click of the submit button
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    setStringifiedCookie('cart', []);
    props.setItemsInCookieCart([]);

    router.push('/thanks').catch(() => {});
  };

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
            <h3>Checkout</h3>
            <h4>Please Enter Your Information</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <ul>
                <li>
                  <input
                    placeholder="first name"
                    data-test-id="checkout-first-name"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="last name"
                    data-test-id="checkout-last-name"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="email"
                    data-test-id="checkout-email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="address"
                    data-test-id="checkout-address"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="city"
                    data-test-id="checkout-city"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="email"
                    data-test-id="checkout-email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="postal code"
                    data-test-id="checkout-postal-code"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="country"
                    data-test-id="checkout-country"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="credit card"
                    data-test-id="checkout-credit-card"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="expiration-date"
                    data-test-id="checkout-expiration-date"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="security code"
                    data-test-id="checkout-security-code"
                    required
                  />
                </li>
              </ul>
              {/* <div className="submitButtonStyles">
              <button data-test-id="checkout-confirm-order">Submit</button>
            </div> */}
            </div>

            <div className="checkoutInfo">
              <button data-test-id="checkout-confirm-order">Submit</button>
              <h4 className="cartStyles">
                Total fabrics in cart are: {summedQuantity}
              </h4>
              <h3 className="sumStyles">Total sum is: {sum}</h3>
            </div>
          </form>
        </main>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const currentCart = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];
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

import { css } from '@emotion/react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Link from 'next/link';

// import Cart from '../pages/cart';

const navBarStyles = css`
  background: #0071dc;
  padding: 10px 8px;
  font-weight: 600;

  a {
    color: #fff;
    margin-left: 10px;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;
  }
`;

const shoppingCartStyles = css`
  color: #fff;
  margin-right: 10px;
  cursor: pointer;
`;

// const brandStyles = css`
//   a {
//     font-weight: bold;
//     font-size: 2.5rem;
//     text-decoration: none;
//   }
// `;

const headerGrowStyles = css`
  /* flex-grow: 1; */
  display: flex;
  justify-content: space-between;

  a {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export default function Header() {
  // run over cookies in cart and calculate the quantity of each fabric
  // let totalQuantity = 0;
  // for (let i = 0; i < props.productCarts.length; i++) {
  //   totalQuantity += props.productCarts[i].quantity;
  // }
  return (
    <div css={navBarStyles}>
      <div css={headerGrowStyles}>
        <div>
          <Link href="/">Fabric Shop</Link>
        </div>
        <div>
          <Link href="/products">Products</Link>
        </div>
        <div css={shoppingCartStyles}>
          <Link href="/cart">
            {/* {totalQuantity} */}
            <ShoppingCartOutlinedIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

import { css } from '@emotion/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';

// import Cart from '../pages/cart';

const navBarStyles = css`
  background: #0071dc;

  a {
    color: #fff;
    margin-left: 10px;
    text-decoration: none;
  }
`;

const brandStyles = css`
  a {
    font-weight: bold;
    font-size: 2.5rem;
    text-decoration: none;
  }
`;

const headerGrowStyles = css`
  flex-grow: 1;

  a {
    margin-left: 10px;
  }
`;

export default function Header() {
  return (
    <div css={navBarStyles}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" css={brandStyles}>
            Fabric
          </Link>
          <div css={headerGrowStyles} />
          <div>
            <Link href="/products">Product</Link>
            <Link href="/cart">
              <ShoppingCartIcon />
              {/* Cart */}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

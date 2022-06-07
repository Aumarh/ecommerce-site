import { css } from '@emotion/react';
import { AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';

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
`;

export default function Header() {
  return (
    <div>
      <AppBar css={navBarStyles} position="static">
        <Toolbar>
          <Link href="/" css={brandStyles}>
            Fabric
          </Link>
          <div css={headerGrowStyles} />
          <div>
            <Link href="/products">Product</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

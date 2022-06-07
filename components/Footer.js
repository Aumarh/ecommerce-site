import { css } from '@emotion/react';
import { Typography } from '@mui/material';

const footerStyles = css`
  color: #fff;
  background: #004f9a;
  padding: 18px 0;
  text-align: center;
  margin-top: 10px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <Typography>Ⓒ Fabric Store. All Rights Reserved.</Typography>
    </footer>
  );
}

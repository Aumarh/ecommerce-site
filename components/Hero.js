import { css } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';

const heroStyle = css`
  background-image: url('heroimage1.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  height: 90vh;
  width: 100%;
  position: relative;
`;

const heroHeadersContainer = css`
  position: absolute;
  bottom: 30%;
  left: 10%;
  width: 30%;

  @media (max-width: 1280px) {
    width: 40%;
  }
  @media (max-width: 540px) {
    width: 50%;
  }
  button {
    @media (max-width: 950px) {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
`;

const buttonContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const heroSubheading = css`
  background-color: rgba(255, 255, 255, 0.9);
  /* text-transform: uppercase; */
  /* text-align: center; */
  text-shadow: 1px 1px 2px white, 0 0 1em white, 0 0 0.2em white;
  /* text-shadow: none; */
  letter-spacing: 4px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 12px;
  padding-top: 12px;
  font-weight: 600;
`;

const paragraphStyles = css`
  font-family: cursive;
  font-weight: 600;
  font-size: 1.3rem;
`;

const heroHeading = css`
  padding-left: 24px;
  padding-right: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  h1 {
    margin: 0 0;
    line-height: 96px;
    @media (max-width: 1280px) {
      font-size: 2.5rem;
    }
    @media (max-width: 950px) {
      font-size: 2rem;
      line-height: 64px;
    }
    @media (max-width: 880px) {
      font-size: 1.5rem;
      line-height: 58px;
    }
    @media (max-width: 540px) {
      font-size: 1.2rem;
      line-height: 52px;
    }
  }
`;

export default function Hero() {
  return (
    <div css={heroStyle}>
      <div css={heroHeadersContainer}>
        <div css={heroSubheading}>
          <Typography>
            Your one stop shop for all your fabric options. <br /> <br />
            We have different fabrics from around the world, 100% eco-friendly
            and ethically sourced.
          </Typography>
        </div>
        <div css={heroHeading}>
          <Typography variant="h1">
            <div css={paragraphStyles}>
              If we don't have it, we can source for it.
            </div>
          </Typography>
        </div>
        <div css={buttonContainer}>
          <Link href="products">
            <Button variant="contained" color="primary">
              <Typography>Shop Fabrics</Typography>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

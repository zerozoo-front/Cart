import React, { memo } from 'react';
import styled from 'styled-components';

const ProductImageContainer = styled.div`
  display: grid;
  place-items: center;
  img {
    width: 5rem;
    height: 6rem;
    overflow: hidden;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.8rem;
    margin-right: 0.7rem;
  }
`;
const ProductImage = ({ data }) => {
  return (
    <ProductImageContainer>
      <img src={data.image_url} />
    </ProductImageContainer>
  );
};

export default memo(ProductImage);

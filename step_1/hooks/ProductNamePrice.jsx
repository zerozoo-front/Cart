import React, { memo } from 'react';
import styled from 'styled-components';
import { useNumberToMoney } from './useNumberToMoney';

const ProductNamePriceContainer = styled.div`
  min-width: 11rem;
  span {
    margin: 0 0.2rem;
  }
`;

const ProductNamePrice = ({ data }) => {
  return (
    <ProductNamePriceContainer>
      <span> {data.product_name} </span>
      <span> {useNumberToMoney(data.product_price)} 원</span>
    </ProductNamePriceContainer>
  );
};

export default memo(ProductNamePrice);

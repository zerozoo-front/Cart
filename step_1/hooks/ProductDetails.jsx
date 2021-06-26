import React from 'react';
import styled from 'styled-components';
import { useNumberToMoney } from './useNumberToMoney';

const ProductDetailsTable = styled.table`
  border-collapse: separate;
  border-spacing: 2.3rem 2.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.grey400};
  margin-top: 1rem;
  /* width: 594.78px; */
  thead {
    tr:nth-child(2) {
      display: grid;
      place-items: center;
      grid-template-columns: repeat(4, 0.2fr);
      text-align: left;
    }
  }
  #productDetails {
    tr {
    }
  }
`;
export const ProductDetails = ({ totalCount, totalPrice }) => {
  return (
    <ProductDetailsTable>
      <thead>
        <tr>
          <th> 총 상품 수량 </th>
          <th> 총 상품 금액 </th>
          <th> 총 배송비 </th>
          <th> 총 결제하실 금액 </th>
        </tr>
      </thead>
      <tbody id='productDetails'>
        <tr>
          <td>
            <span>{totalCount}</span>
          </td>
          <td>
            <span>{useNumberToMoney(totalPrice)}원</span>
          </td>
          <td>얼마</td>
          <td>총금액</td>
        </tr>
      </tbody>
    </ProductDetailsTable>
  );
};
// totalPrice

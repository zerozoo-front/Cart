import React from 'react';
import styled from 'styled-components';
import { useNumberToMoney } from './useNumberToMoney';
import { useSelector } from 'react-redux';
import { selectDelivery } from '../../store/counterReducer';

const ProductDetailsTable = styled.table`
  border-collapse: separate;
  border-spacing: 2.3rem 2.5rem;
  margin-top: 1rem;
  /* width: 594.78px; */
  thead {
    tr {
      display: grid;
      grid-template-columns: repeat(4, 0.3fr);
      min-width: 30rem;
      text-align: center;
      text-align: left;
      margin-left: 1.5rem;
    }
  }
  tbody {
    tr {
      display: grid;
      /* text-align: center; */
      grid-template-columns: repeat(4, 0.3fr);
      min-width: 30rem;
      margin-left: 1.5rem;
    }
  }
`;
export const ProductDetails = ({ totalCount, totalPrice }) => {
  const deliveryCost = useSelector(selectDelivery);
  console.log('total', totalPrice);
  console.log('delivery', deliveryCost);
  const order = () => {
    console.log('order');
  };
  return (
    <>
      <ProductDetailsTable>
        <thead>
          <tr>
            <th> 총 상품 수량 </th>
            <th> 총 상품 금액 </th>
            <th> 총 배송비 </th>
            <th> 총 결제하실 금액 </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>{totalCount} 개 </span>
            </td>
            <td>
              <span>{useNumberToMoney(totalPrice)} 원</span>
            </td>
            <td>{useNumberToMoney(deliveryCost)} 원</td>
            <td>{useNumberToMoney(totalPrice + deliveryCost)} 원</td>
          </tr>
          <tr>
            <td>
              <h2 onClick={order}>order</h2>
            </td>
          </tr>
        </tbody>
      </ProductDetailsTable>
    </>
  );
};
// totalPrice

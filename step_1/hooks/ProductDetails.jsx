import React from 'react';
import styled from 'styled-components';
import { useNumberToMoney } from './useNumberToMoney';
import { useSelector } from 'react-redux';
import { selectDelivery } from '../../store/counterReducer';
import { OrderBtn } from './OrderBtn';
import { Dropdown } from './Dropdown';

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
// order = on일 때 store에서 counter에 접근
// order on인 경우 store.isOrder on
// counter에서 isOrder=on인 경우 store dispatch
export const ProductDetails = ({ setPassOrder, totalCount, totalPrice }) => {
  const deliveryCost = useSelector(selectDelivery);
  // const onSubmit = (e) => {};

  // <form onSubmit={onSubmit} method='POST'>
  //   <Dropdown />
  //   <OrderBtn
  //     setPassOrder={setPassOrder}
  //     totalCost={totalPrice + deliveryCost}
  //   />
  // </form>
  return (
    <>
      <Dropdown
        totalCount={totalCount}
        totalPrice={totalPrice}
        setPassOrder={setPassOrder}
      />
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
            <td></td>
          </tr>
        </tbody>
      </ProductDetailsTable>
    </>
  );
};

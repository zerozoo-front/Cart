import React, { useEffect } from 'react';
import styled from 'styled-components';
import { selectDeliveryWay } from '../../store/counterReducer';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProductCount,
  selectProductList,
  selectIsOrder,
} from '../../store/counterReducer';

export const OrderBtn = ({ totalCost, setPassOrder }) => {
  const deliveryWay = useSelector(selectDeliveryWay);
  const productCount = useSelector(selectProductCount);
  const isOrder = useSelector(selectIsOrder);
  const productList = useSelector(selectProductList);
  const dispatch = useDispatch();
  const onClick = () => {
    setPassOrder(true);
  };
  useEffect(() => {
    if (selectProductList.length === 0) {
      alert('상품을 선택해 주세요.');
      return;
    }
    if (isOrder) {
      console.log('상품 정보:', productCount);
      console.log('총 금액: ', totalCost);
      console.log('배송방법: ', deliveryWay);
    }
  }, [isOrder]);

  return (
    <>
      <input type='submit' value='주문하기' onClick={onClick}></input>
    </>
  );
};

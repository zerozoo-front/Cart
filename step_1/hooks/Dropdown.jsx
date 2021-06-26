import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNumberToMoney } from './useNumberToMoney';
import { deliveryTypes } from '../../data';
import { OrderBtn } from './OrderBtn';

import {
  selectDeliveryWay,
  selectProductCount,
  selectProductList,
  selectIsOrder,
} from '../../store/counterReducer';

import { useDispatch, useSelector } from 'react-redux';
import { selectDelivery, setDelivery } from '../../store/counterReducer';

const DropdownContainer = styled.div`
  margin-left: 1rem;
`;

export const Dropdown = ({
  totalCount,
  totalPrice,
  passOrder,
  setPassOrder,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const delivery = useSelector(selectDelivery);

  const deliveryWay = useSelector(selectDeliveryWay);
  const productCount = useSelector(selectProductCount);
  const isOrder = useSelector(selectIsOrder);
  const onSubmit = (e) => {
    e.preventDefault();
    setPassOrder(true);
  };
  useEffect(() => {
    if (selectProductList.length === 0) {
      alert('상품을 선택해 주세요.');
      return;
    }
    if (isOrder) {
      console.log('상품 정보:', productCount);
      console.log('총 금액: ', totalCount + totalPrice);
      console.log('배송방법: ', deliveryWay);
    }
  }, [isOrder]);

  const onChange = (e) => {
    dispatch(setDelivery(e.target.value));
  };
  useEffect(() => {
    if (passOrder && delivery === '') {
      alert('배송 방법을 선택해주세요.');
    }
  }, [passOrder]);

  return (
    <DropdownContainer>
      <form onSubmit={onSubmit} method='POST'>
        <select required onChange={onChange} id='chosen' name='chooseDelivery'>
          <option value=''>선택해주세요 🚚</option>
          {deliveryTypes.map((v) => (
            <option key={v.id} value={v.name}>
              {v.name}: {useNumberToMoney(v.delivery_price)} 원
            </option>
          ))}
        </select>
        <input type='submit' value='주문하기'></input>
      </form>
    </DropdownContainer>
  );
};

// <input type='submit'></input>

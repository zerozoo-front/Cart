import React, { memo, useState } from 'react';

import _, { cloneDeep } from 'lodash';
import { Cancel } from '@styled-icons/material-outlined/Cancel';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCheckCounter,
  setCheckCounter,
  selectCartListCount,
  setCartListCount,
  selectProductList,
  setProductList,
} from '../../store/counterReducer';
import styled from 'styled-components';

const CancelContainer = styled.div``;
export const CancelBtn = memo(
  ({ idx, data, setTotalCount, setTotalPrice, setCount }) => {
    const dispatch = useDispatch();
    const checkCount = useSelector(selectCheckCounter);
    const cartListCount = useSelector(selectCartListCount);
    const productList = useSelector(selectProductList);
    let copyProductList = cloneDeep(productList);

    const onClick = () => {
      dispatch(setCartListCount(cartListCount - 1));
      dispatch(setCheckCounter(checkCount - 1));
      setTotalCount((prev) => prev - 1);
      setTotalPrice((prev) => prev - data.product_price);
      copyProductList.splice(idx, 1);
      dispatch(setProductList(copyProductList));
      const parentNode = document.getElementById(`list${idx}`);
      parentNode.remove();
    };

    return (
      <CancelContainer>
        <Cancel onClick={onClick} size='25' />
      </CancelContainer>
    );
  }
);

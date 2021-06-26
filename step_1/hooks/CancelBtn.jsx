import React, { memo, useMemo } from 'react';

import { Cancel } from '@styled-icons/material-outlined/Cancel';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCheckCounter,
  selectCheckCounter,
  selectCartListCount,
  setCartListCount,
} from '../../store/counterReducer';

// checkCount minus
// setCount minus
// setChecker false
// setTotalCount, setTotalPrice -
// needs data

export const CancelBtn = memo(
  ({ data, setTotalCount, setTotalPrice, setCount }) => {
    const dispatch = useDispatch();
    const checkCount = useSelector(selectCheckCounter);
    const cartListCount = useSelector(selectCartListCount);
    // console.log('data', data);
    const onClick = () => {
      dispatch(setCartListCount(cartListCount - 1));
      dispatch(setCheckCounter(checkCount - 1));
      setTotalCount((prev) => prev - 1);
      setTotalPrice((prev) => prev - data.product_price);
      const parentNode = document.getElementById('list');
      parentNode.remove();
    };

    return (
      <>
        <Cancel onClick={onClick} size='25' />
      </>
    );
  }
);

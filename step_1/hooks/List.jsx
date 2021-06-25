import React, { useState, memo, useEffect } from 'react';
import Counter from './Counter';
import { Cancel } from '@styled-icons/material-outlined/Cancel';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import {
  setCheckCounter,
  selectCheckCounter,
  selectSecondsLoop,
  setIsClickedCheckBox,
} from '../../store/counterReducer';

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  #Cancel {
    margin-left: auto;
  }
`;

const List = ({
  totalChecker,
  setTotalChecker,
  setTotalCount,
  data,
  setTotalPrice,
  orderNumber,
  orderLength,
}) => {
  const [count, setCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [checker, setChecker] = useState(false);
  const dispatch = useDispatch();
  const checkCount = useSelector(selectCheckCounter);
  const secondsLoop = useSelector(selectSecondsLoop);

  const deleteList = () => {
    setTotalCount((prev) => prev - count);
    setTotalPrice((prev) => prev - data.product_price * count);
    dispatch(setCheckCounter(checkCount - 1));
    setIsDeleted(true);
  };
  const onChange = (e) => {
    let isChecked = e.target.checked;
    setChecker(!checker);
    dispatch(setIsClickedCheckBox());
    isChecked
      ? dispatch(setCheckCounter(checkCount + 1))
      : dispatch(setCheckCounter(checkCount - 1));
  };

  useEffect(() => {
    console.log('checkCount: ', checkCount);
    console.log('orderNumber: ', orderNumber);
    dispatch(setCheckCounter(checkCount + orderNumber));
    setChecker(true);
  }, []);

  useEffect(() => {
    if (totalChecker === true && secondsLoop) {
      setChecker(true);
      console.log('total checker in');
      dispatch(setCheckCounter(checkCount + orderNumber));
      setTotalCount(orderNumber);
    } else if (
      totalChecker === false &&
      checkCount === orderLength &&
      secondsLoop
    ) {
      console.log('total checker out');
      setChecker(false);
      setTotalCount(0);
      if (checkCount === 0) return;
      dispatch(setCheckCounter(0));
    }
  }, [totalChecker]);

  return (
    <>
      {!isDeleted ? (
        <ListContainer>
          <input type='checkbox' checked={checker} name={data.id + 'chkBox'} />
          <Counter
            checker={checker}
            data={data}
            count={count}
            setTotalCount={setTotalCount}
            setCount={setCount}
            setTotalPrice={setTotalPrice}
          />
          <Cancel id='Cancel' size='25' />
        </ListContainer>
      ) : null}
    </>
  );
};
export default memo(List);

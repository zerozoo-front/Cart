import React, { useState, memo, useEffect } from 'react';
import Counter from './Counter';
import { Cancel } from '@styled-icons/material-outlined/Cancel';
import styled from 'styled-components';
import ProductImage from './ProductImage';

import { useSelector, useDispatch } from 'react-redux';
import {
  setCheckCounter,
  selectCheckCounter,
  selectSecondsLoop,
  selectCartListCount,
  setIsClickedCheckBox,
} from '../../store/counterReducer';

const ListContainer = styled.div`
  display: flex;
  height: 8rem;
  align-items: center;
  justify-content: center;
  #Cancel {
    margin-left: auto;
  }
`;

const List = ({ data, setTotalCount, setTotalPrice, totalChecker }) => {
  const [count, setCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [checker, setChecker] = useState(false);
  const dispatch = useDispatch();
  const checkCount = useSelector(selectCheckCounter);

  const onChange = (e) => {
    let isChecked = e.target.checked;
    setChecker(!checker);
    dispatch(setIsClickedCheckBox());
    isChecked
      ? dispatch(setCheckCounter(checkCount + 1))
      : dispatch(setCheckCounter(checkCount - 1));
  };

  // react total checker
  useEffect(() => {
    if (totalChecker) {
      setChecker(true);
    }
    if (checkCount === 4 && !totalChecker) {
      setChecker(false);
    }
  }, [totalChecker]);
  // totalChecker=>Checker

  return (
    <>
      {!isDeleted ? (
        <ListContainer>
          <input
            onChange={onChange}
            checked={checker}
            type='checkbox'
            name={data.id + 'chkBox'}
          />
          <ProductImage data={data} />
          <Counter
            checker={checker}
            data={data}
            count={count}
            setTotalPrice={setTotalPrice}
            setTotalCount={setTotalCount}
            setCount={setCount}
          />
          <Cancel id='Cancel' size='25' />
        </ListContainer>
      ) : null}
    </>
  );
};
export default memo(List);

//     checker={checker}
//     data={data}
//     count={count}
//     setTotalCount={setTotalCount}
//     setCount={setCount}
//     setTotalPrice={setTotalPrice}

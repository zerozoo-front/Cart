import React, { useState, memo, useEffect } from 'react';
import Counter from './Counter';
import { Cancel } from '@styled-icons/material-outlined/Cancel';
import styled from 'styled-components';

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
  align-items: center;
  #Cancel {
    margin-left: auto;
  }
`;

const List = ({ data, setTotalCount, setTotalPrice, totalChecker }) => {
  const [count, setCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [checker, setChecker] = useState(false);
  const [isOnChanged, setIsOnChanged] = useState(false);
  const dispatch = useDispatch();
  const checkCount = useSelector(selectCheckCounter);

  const onChange = (e) => {
    let isChecked = e.target.checked;
    setIsOnChanged(true);
    setChecker(!checker);
    dispatch(setIsClickedCheckBox());
    // 함수가 끝나기 전까지는 setChecker는 적용되지 않음
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

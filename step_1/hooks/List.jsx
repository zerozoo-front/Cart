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
    isChecked
      ? dispatch(setCheckCounter(checkCount + 1))
      : dispatch(setCheckCounter(checkCount - 1));
  };
  //   useEffect(() => {
  //     if (!isOnChanged) return;
  //     console.log('checker', checker);
  //     if (checker) {
  //       dispatch(setCheckCounter(checkCount + 1));
  //     } else if (!checker) {
  //       dispatch(setCheckCounter(checkCount - 1));
  //     }
  //   }, [checker]);
  // 초기 checkbox 활성화

  // react total checker
  useEffect(() => {
    if (totalChecker) {
      setChecker(true);
    }
  }, [totalChecker]);
  useEffect(() => {
    if (checkCount === 0) {
      setChecker(false);
    }
  }, [checkCount]);

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

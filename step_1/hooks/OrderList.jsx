import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import List from './List';
import { cartLists } from '../../data.js';

import { useSelector, useDispatch } from 'react-redux';
import {
  setSecondsLoop,
  selectCheckCounter,
  selectCartListCount,
  setCheckCounter,
  selectSecondsLoop,
} from '../../store/counterReducer';

const StyledContainer = styled.div``;
const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 1rem 1rem;
  outline: 1px solid red;
  #lists {
    tr:nth-of-type(odd) {
      background-color: #efefef;
    }
    td {
      width: 20rem;
      line-height: 5rem;
    }
  }
`;

export default memo(function OrderList() {
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalChecker, setTotalChecker] = useState(true);
  const dispatch = useDispatch();
  const checkCount = useSelector(selectCheckCounter);
  const cartListLength = useSelector(selectCartListCount);
  const secondsLoop = useSelector(selectSecondsLoop);

  const numberCommaInjector = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  useEffect(() => {
    dispatch(setCheckCounter(cartListLength));
  }, []);

  useEffect(() => {
    if (checkCount !== cartListLength) {
      setTotalChecker(false);
    } else if (checkCount === cartListLength) {
      setTotalChecker(true);
    }
  }, [checkCount]);
  const onChange = () => {
    dispatch(setSecondsLoop());
    setTotalChecker(!totalChecker);
  };
  useEffect(() => {
    if (!secondsLoop) return;
    if (totalChecker) {
      dispatch(setCheckCounter(cartListLength));
    }
    if (!totalChecker && checkCount === cartListLength) {
      dispatch(setCheckCounter(0));
    }
  }, [totalChecker]);
  return (
    <StyledContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>상품 내역</th>
          </tr>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={totalChecker}
                onChange={onChange}
                name='all'
              />
              전체
            </th>
          </tr>
        </thead>
        <tbody id='lists'>
          {cartLists.map((data, i) => (
            <tr key={data.id}>
              <td
                children={
                  <List
                    data={data}
                    totalChecker={totalChecker}
                    setTotalPrice={setTotalPrice}
                    setTotalCount={setTotalCount}
                  />
                }
              />
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th>상품 내역</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>총 상품 수량</span>
              <span>{totalCount}</span>
            </td>
            <td>
              <span>총 상품 금액</span>
              <span>{numberCommaInjector(totalPrice)}원</span>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
});

//     totalChecker={totalChecker}
//     setTotalChecker={setTotalChecker}
//     setTotalCount={setTotalCount}
//     setTotalPrice={setTotalPrice}
//     data={data}
//     orderNumber={i + 1}
//     orderLength={cartLists.length}

//   cartLists.length 의존성 제거
//   checkCount===check되어 있는 수
//   useEffect(() => {
//     if (checkCount === cartListLength) {
//       setTotalChecker(true);
//     } else {
//       setTotalChecker(false);
//     }
//   }, [checkCount]);

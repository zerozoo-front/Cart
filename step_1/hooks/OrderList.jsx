import React, { useState, useEffect } from 'react';
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

export default function OrderList() {
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
  // redux  //
  // --- redux checkCounter --- //
  useEffect(() => {
    dispatch(setCheckCounter(cartListLength));
  }, []);
  // 새로 load 되는 경우 checker count = data.length
  // rules 1. totalChecker ? 전체 체크 : 각자

  // check 중 하나가 해제되면 전체 check 해제
  useEffect(() => {
    if (checkCount !== cartListLength) {
      setTotalChecker(false);
    } else if (checkCount === cartListLength) {
      setTotalChecker(true);
    }
  }, [checkCount]);
  //

  // totalChecks onChange
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
  // totalChecker가 눌리는 경우 length만큼의 길이를 다시 checker로 업데이트
  // false가 된 경우 0

  // === redux checkCounter === //
  // redux secondsLoop //
  // totalChecker swap

  // redux secondsLoop //
  // redux  //

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
        <colgroup>
          <col />
          <col />
        </colgroup>
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
}

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

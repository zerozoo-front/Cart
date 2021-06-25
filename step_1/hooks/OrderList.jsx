import React, { useState } from 'react';
import styled from 'styled-components';
import List from './List';
import { cartLists } from '../../data.js';

const StyledTable = styled.table``;
const Tfoot = styled.tfoot``;
const Tbody = styled.tbody``;
const Thead = styled.thead``;
const Tr = styled.tr``; // row
const Th = styled.th``; // header
const Td = styled.td``; // data
export default function OrderList() {
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const numberCommaInjector = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <div>
      <StyledTable>
        <Thead>
          <Tr>
            <Th>상품 내역</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th>
              <input type='checkbox' name='all' />
              전체
            </Th>
          </Tr>
          <Tr>
            {cartLists.map((data) => (
              <Td
                key={data.id}
                children={
                  <List
                    setTotalCount={setTotalCount}
                    setTotalPrice={setTotalPrice}
                    data={data}
                  />
                }
              />
            ))}
          </Tr>
        </Tbody>
        <Thead>
          <Tr>
            <Th>상품 내역</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <span>총 상품 수량</span>
              <span>{totalCount}</span>
            </Td>
            <Td>
              <span>총 상품 금액</span>
              <span>{numberCommaInjector(totalPrice)}원</span>
            </Td>
          </Tr>
        </Tbody>
      </StyledTable>
    </div>
  );
}

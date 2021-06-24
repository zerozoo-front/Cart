import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowDownShort } from '@styled-icons/bootstrap/ArrowDownShort';

const DropdownContainer = styled.div`
  border: 1px solid black;
  width: 25rem;
  /* height: 2rem; */

  margin-left: 0.5rem;
  .chosen {
    display: flex;
    cursor: pointer;
    padding: 0.5rem 0;
    margin-left: 0.5rem;
    & :last-child {
      margin-left: auto;
    }
  }
  ul {
    li {
      padding: 0.7rem 0;
      .item {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        border-bottom: 1px solid ${(props) => props.theme.colors.grey500};
        & > div {
          margin: 0 0.5rem;
          padding: 0.5rem 0;
        }
      }
      &:last-child {
        .item {
          border-bottom: none;
        }
      }

      #price {
        margin-left: auto;
        color: ${(props) => props.theme.colors.grey500};
      }
    }
  }
`;
export const Dropdown = ({ input }) => {
  const [isDowned, setIsDowned] = useState(false);
  const [chosen, setChosen] = useState('');
  const [price, setPrice] = useState('');
  const arrayInput = Object.values(input);
  useEffect(() => {
    const backdropClick = document.addEventListener('click', (e) => {
      if (
        e.target.className !== 'chosen' &&
        e.target.className !== 'item' &&
        isDowned
      ) {
        setIsDowned(!isDowned);
      }
    });
    return backdropClick;
  }, [isDowned]);

  const reg = /\([^)]*\)/;
  const choice = (e, index = 0) => {
    const text = e.target.innerText;
    setChosen(text);
    setIsDowned(!isDowned);
  };
  const clickChosen = () => {
    setIsDowned(!isDowned);
  };
  return (
    <DropdownContainer>
      <div className='chosen' onClick={clickChosen}>
        <span id='item'>{chosen === '' ? '선택해주세요' : chosen}</span>
        <span id='price'> {chosen && price}</span>
        <span>
          <ArrowDownShort size='18' />
        </span>
      </div>
      <ul onClick={choice}>
        {isDowned
          ? arrayInput.map((value, index) => (
              <li key={value + index}>
                {value.match(reg) === null ? (
                  <span className='item'>
                    <div>{value}</div>
                  </span>
                ) : (
                  <div className='item'>
                    <div>{value.slice(0, value.match(reg).index)}</div>
                    <div id='price'>{value.match(reg)[0]}</div>
                  </div>
                )}
              </li>
            ))
          : null}
      </ul>
    </DropdownContainer>
  );
};

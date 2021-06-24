import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowDownShort } from '@styled-icons/bootstrap/ArrowDownShort';

const DropdownContainer = styled.div`
  #select {
    display: flex;
    span:last-child {
      margin-left: auto;
    }
  }
  width: 60vw;
  margin: 0 auto;
  div > ul > li {
    border: 1px solid black;
    padding: 0.5rem 0.5rem;
    margin: 0rem 0;
  }

  .items {
    border: 1px solid black;
    border-bottom: none;
    display: flex;
    padding: 0.5rem 0.5rem;
    margin: 0rem 0;

    &:first-child {
      border-top: none;
    }
    &:last-child {
      border-bottom: 1px solid black;
    }
  }
  .item:last-child {
    color: ${(props) => props.theme.colors.grey500};
    margin-left: auto;
  }
`;

export const Dropdown = ({ input }) => {
  const [isDown, setIsDown] = useState(false);
  const [chosen, setChosen] = useState('');

  useEffect(() => {
    if (!isDown) return;
    const event = document.addEventListener('click', (e) => {
      if (!document.getElementById('Dropdown').contains(e.target)) {
        setIsDown(!isDown);
      }
    });
    return event;
  }, [isDown]);

  const select = (e) => {
    setIsDown(!isDown);
    if (e.target.id === 'select') return;
    if (e.target.className === 'items') {
      setChosen(e.target.innerText);
      return;
    }
    setChosen(e.target.parentNode.innerText);
  };
  return (
    <DropdownContainer>
      <div>
        <ul id='Dropdown' onClick={select}>
          <li id='select'>
            <span>{chosen === '' ? '선택해주세요.' : chosen}</span>
            <span>
              <ArrowDownShort size='18' />
            </span>
          </li>
          <div id='list'>
            {isDown &&
              input.map((v) => (
                <li className='items' key={v.id}>
                  <span className='item'>{v.name}</span>
                  <span className='item'>
                    {v.delivery_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    원
                  </span>
                </li>
              ))}
          </div>
        </ul>
      </div>
    </DropdownContainer>
  );
};

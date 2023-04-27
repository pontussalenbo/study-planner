// ScrollArrow.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const ArrowButton = styled.button`
  position: fixed;
  right: 5px;
  bottom: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #e1e4e8;
  &:hover {
    background-color: #d1d5da;
  }
  border-radius: 50%;
`;

const ArrowIcon = styled.svg<{ isPointingDown: boolean }>`
  transform: ${props => (props.isPointingDown ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
  fill: #586069;
`;

const ScrollArrow: React.FC = () => {
  const [isPointingDown, setIsPointingDown] = useState(true);

  const handleClick = () => {
    const targetY = isPointingDown ? document.body.scrollHeight : 0;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    setIsPointingDown(prev => !prev);
  };

  return (
    <ArrowButton onClick={handleClick}>
      <Circle>
        <ArrowIcon
          isPointingDown={isPointingDown}
          width='30'
          height='40'
          viewBox='0 0 24 24'
        >
          <path d='M12 3l-6 9h5v9h2v-9h5z' />
        </ArrowIcon>
      </Circle>
    </ArrowButton>
  );
};

export default ScrollArrow;

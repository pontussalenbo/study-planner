import styled from 'styled-components';

export const TableFooterWrapper = styled.div`
    background-color: #f1f1f1;
    padding: 8px 0px;
    width: 100%;
    font-weight: 500;
    text-align: left;
    font-size: 16px;
    color: #2c3e50;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button<{ isActive: boolean }>`
    border: none;
    padding: 7px 14px;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 4px;
    margin-left: 4px;
    color: ${props => (props.isActive ? 'white' : '#2c3e50')};
    background: ${props => (props.isActive ? '#185adb' : '#f9f9f9')};
`;

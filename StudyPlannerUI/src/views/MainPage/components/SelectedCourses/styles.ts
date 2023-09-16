import { StyledButton } from 'components/Button';
import { Tokens } from 'style/tokens';
import styled from 'styled-components';

export const ArrowButton = styled.button`
    &:hover {
        cursor: pointer;
        background: ${Tokens.neutral30};
    }
    &:active {
        scale: 0.95;
        background-color: ${Tokens.neutral25};
        color: ${({ theme }) => theme.onSecondaryContainer};
    }
    border: 1px solid white;
    border-radius: 6px;
    padding: 5px 10px;
    color: white;
`;

export const ButtonIcon = styled.span`
    margin-right: 4px;
`;

export const RemoveButton = styled(StyledButton)`
    display: block;
    margin: 0 auto;
    background: ${({ theme }) => theme.errorContainer};
`;

export const Wrapper = styled.div`
    margin-top: auto;
    width: 100%;
`;

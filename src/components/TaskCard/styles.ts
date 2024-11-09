import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #000;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  span {
    width: 80%;
  }
`;

export const CardId = styled.p`
  span {
    color: gray;
  }
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

import styled from 'styled-components';

export const Container = styled.div``;

export const ConfirmContainer = styled.div`
  background-color: #3a3174;
  padding: 20px;
  width: 90%;

  p {
    color: #fff;
  }

  div {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    button {
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background-color: rgb(255, 216, 67);
      font-weight: bold;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.6;
      }
    }
  }
`;

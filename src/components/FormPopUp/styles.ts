import styled from 'styled-components';

export const Container = styled.div``;

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 17px;
  transition: 500ms;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }

  &:active {
    opacity: 0.6;
  }
`;

export const FormContent = styled.div`
  padding: 8px;
  background-color: #3a3174;
  border: 1px solid #000;
  margin-top: 10px;
  border-radius: 20px;

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;

    div {
      display: flex;
      flex-direction: column;

      span {
        margin-bottom: 5px;
        font-size: 20px;
        color: #fff;
      }

      input {
        padding: 15px 5px;
        font-size: 15px;
        outline: none;
        border-radius: 8px;
        border: none;

        &::placeholder {
          font-size: 16px;
        }
      }
    }

    button {
      padding: 15px 0;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      font-size: 18px;
      color: #000;
      font-weight: bold;
      background-color: #ffd843;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.6;
      }
    }
  }
`;

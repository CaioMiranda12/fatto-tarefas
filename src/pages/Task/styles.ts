import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: blueviolet;
  gap: 50px;

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    border: 1px solid #000;
    width: 40%;
    background-color: #fff;
    border-radius: 16px;

    @media (max-width: 720px) {
      width: 70%;
    }

    div {
      display: flex;
      flex-direction: column;

      span {
        margin-bottom: 5px;
        font-size: 20px;
      }

      input {
        padding: 15px 5px;
        font-size: 15px;
        outline: none;
        border-radius: 8px;

        &::placeholder {
          font-size: 16px;
        }
      }
    }

    button {
      padding: 15px 0;
      background-color: #ffd843;
      border: none;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.6;
      }
    }
  }
`;

export const HeaderTask = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 720px) {
    width: 70%;
  }

  h1 {
    color: #fff;

    @media (max-width: 720px) {
      font-size: 25px;
    }
  }
`;

export const HeaderLink = styled(Link)`
  background-color: #000;
  text-decoration: none;
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  color: #fff;
  transition: 500ms;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

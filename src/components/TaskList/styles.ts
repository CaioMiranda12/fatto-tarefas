import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: calc(100vh - 100px);
  background-color: blueviolet;
`;

export const Content = styled.div`
  max-width: 1024px;
  width: 100%;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 16px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin-top: 20px;
  }

  li {
    list-style: none;
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

export const InputContainer = styled.div`
  border: 1px solid #000;
  width: 50%;
  display: flex;
  align-items: center;

  button {
    border: none;
    padding: 5px;
    background-color: #fff;
    height: 35px;
  }

  input {
    padding: 10px 0;
    border: none;
    outline: none;
    width: 100%;
    background-color: #fff;
  }
`;

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

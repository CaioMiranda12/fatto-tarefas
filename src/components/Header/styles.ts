import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 20px;
  height: 100px;
  background-color: blueviolet;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  width: 100%;

  h1 {
    font-size: 35px;
    color: #fff;
  }
`;

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

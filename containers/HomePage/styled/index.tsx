import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const WelcomeText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 5vw;
  color: ${({ theme }) => theme.colors.primary.light};
  transform: translate(-50%, -50%);
`;

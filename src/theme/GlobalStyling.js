import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body{
  background:  ${({ theme }) => theme.colors.body};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.colors.font};
  transition: all 0.50s linear;
}


a{
  color: ${({ theme }) => theme.colors.link.text};
  cursor: pointer;
}

nav{
  /* background: ${({ theme }) => theme.colors.nav}; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100px;
  color: #fff;
  gap: 30px;
  font-size: 30px;
  /* border-bottom: 1px solid #676767; */
}

nav a{
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  text-decoration: none;
  font-weight: 300;
}

footer{
  position: fixed;
  bottom: 0; 
  left: 0; 
  width: 100vw; 
  /* border-top: 1px solid #676767; */
}


button{
  border: 0;
  display: inline-block;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 5px;
  background-color: #6200EE;
  color: #fff;
  font-family: ${({ theme }) => theme.font};
  cursor: pointer;
}

button.btn{
  background-color: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.button.text}
}
`;
import styled from "styled-components";

export const Search = styled.div`
  display: flex;
`;
export const Nav = styled.div`
/* Little white faded box-shadow at bottom */
  box-shadow: 1px 1px 15px rgba(255, 255, 255, 0.09);
z-index:  100;
top: 0;
  background: #050508;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 5rem;

  /* Check if sticky */
  /* &.sticky {
    position: fixed;
    background: #050508;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  } */


  .logo{
    display: flex;
    padding: 0.5rem;
    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Signika', sans-serif;
      font-size: 2.0rem;
      letter-spacing: 0.2rem;
      color: #3991dd;
      font-weight: 500; 
    }
    img{
      width: 40px;
      margin-right: 10px;
      margin-left: -50px;
    }
  }
  @media (max-width: 768px) 
  {
    .logo{
      h1{
        display: none;
      }
      img{
        width: 30px;
        margin-left: -40px;
      }
    }
  }
`;
export const Navlist = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    font-family: 'Signika', sans-serif;
    padding-right: 1rem;
    color: white;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all ease 0.6s;
  }

  &:hover li {
    opacity: 0.3;
  }

  & li:hover{
    opacity: 1;
  }

  /* Set Active Li to Blue */
  & li:active {
    color: #3991dd;
  }


  button {
  border: 0;
  background: #3991dd;
  align-items: center;
  cursor: pointer;
  padding: 0 20px;
  border-radius: 6px;
  color: #f9f9f9;
  font-family: inherit;
  font-weight: 600;
  width: 100%;
  height: 35px;
  font-size: 13px;
  text-align: center;
  transition: 0.6s all;
  display: flex;
  justify-content: space-between;
  }
  button:hover {

    transform: scale(1.05);
    background: #216ce7;
  }

  @media (max-width: 768px) {
    li {
      font-size: 0.7rem;
      padding: 0.5rem;
    }
    button {
      display: none;
      padding: 0.3rem 0.5rem;
      font-size: 0.8rem;
      text-align: center;

    }
  }
`;

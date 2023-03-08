import styled from 'styled-components';

export const MyDiv = styled.div`
  padding: 1.5rem 4.5rem;
  min-height: 66vh;

`;
export const MyTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border-radius: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-family: 'Poppins', sans-serif;
    thead{      border-radius: 1rem;
}

    tr{
      border-radius: 1rem;
    }
  th{
    background-color: #216ce7;
    color: white;
  }
  th , td {
  padding: 8px;
  text-align: center;
  }
  th:first-child, td:first-child {
    text-align: center;
    width: 60%;
  }

  th:first-child {
    border-radius: 2rem 0rem 0rem 0rem;
  }
  th:last-child {
    border-radius: 0rem 2rem 0rem 0rem;
  }
  tr:nth-child(even){
    background: rgba(255, 255, 255, 0.06);
  color: ghostwhite;
  &:hover{
    background: rgba(255, 255, 255, 0.1);
  }

}
  tr:nth-child(odd){
    background:#050508;
  color: ghostwhite;
  &:hover{
    background: rgba(255, 255, 255, 0.1);
  }
}

`;
export const Heading = styled.h1`
  text-align: center;
  color: whistesmoke;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  padding-top: 20px;

  span{
    /* color: gradient of nice blue */
    color: #216ce7;

  }
`;

export const SelectMaterialType = styled.select`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.1rem;
  height: 30px;
  background: transparent;
  font-size: 0.8rem;
  color: #3883c5;
  min-width: 200px;
  max-width: 200px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  margin-right: 1rem;
  /* text-transform: uppercase; */
  cursor: pointer;
  transition: ease-in-out 0.5s;
  font-weight: bold;
  padding: 0px 15px;
  border: none;
  border-bottom: 2px solid #3883c5;

  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

import styled from 'styled-components';
function Footer() {
    return (
        <Foot>
            <h1><img src="https://upload.wikimedia.org/wikipedia/en/e/e4/National_University_of_Computer_and_Emerging_Sciences_logo.png" alt=""/>FastCentralHub</h1>
            <Copyright>
                Copyright 2022 &copy;
            </Copyright>
        </Foot>
    )
}


const Foot = styled.div`
    background: var(--main-color);
display: flex;
align-items: center ;
justify-content: space-between;
width: 100%;
padding: 1rem 4rem;
h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Signika", sans-serif;
    font-size: 2.0rem;
    letter-spacing: 0.2rem;
    color: #3991dd;
    font-weight: 500;
    img{
      width: 40px;
      margin-right: 10px;
      margin-left: -40px;
    }
  }
`;

const Copyright = styled.span`
color: #4d4d4d;
font-size: 1rem;
font-weight: 400;
`;

export default Footer
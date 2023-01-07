import React from 'react'
import styled from "styled-components";

function Heading() {
    return (
        <Wrapper>
            <Content>
                <h1>Your Own Virtual One Stop</h1>
                <p>Welcome to the your Virtual OneStop. Here you can browse and download all the course and teachers data, insight into the societies and a get gist for your coming FYP.</p>
                <h4>IMPORTANT - THIS HUB IS is developed using official API(s)</h4>
            </Content>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  margin: 0.5rem 1.5rem;
`;
const Content = styled.div`
    /* Box-shadow on bottom only */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1{
        font-size: 3.1rem;
        padding: 0.5rem 0rem;
        @media screen and (max-width: 600px) {
            width: 100%;
            text-align: center;
            font-size: 2.1rem;

        }
    }
    p{
        text-align:center;
        width: 60%;
        /* If Mobile screen then width is 100% */
        @media screen and (max-width: 600px) {
            width: 100%;
            font-size: 0.9rem;
        }
        padding: 0.5rem 0rem;
        color: #70797d;
        font-weight: 400;
    }
    h4{
        padding: 0.5rem 0rem;
        color: #3883c5;
        @media screen and (max-width: 600px) {
            width: 100%;
            text-align: center;
            font-size: 0.9rem;
        }
    }
`;
export default Heading
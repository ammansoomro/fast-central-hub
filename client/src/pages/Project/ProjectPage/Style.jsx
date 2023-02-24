import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ProjectDetails = styled.section`
h1{
    /* All Caps */
text-transform: uppercase;
letter-spacing: 0.2rem;
border: none;
    outline: 2px solid #3883c5;
    background: transparent;
    color: #3883c5;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 4px;
    transition: 0.4s;
    margin-top: 1rem;
    margin-right: 0.9rem;
    border-radius: 0.5rem;
    &:hover{
    color: #355C7D;
    outline: 2px solid #355C7D;
    }
}
width: 100%;
max-width: 1000px;
margin: 2rem auto 1rem auto;
padding: 2rem;
text-align: center;
/* padding: 0 5rem; */
.eventdetails{
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(4px);
    border-radius: 20px;
    text-align: center;
    padding: 0.7rem;
    margin: 1.5rem 0;
    transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out, background 0.4s ease-in-out, color 0.4s ease-in-out;

    /* Preset 01 */
    /* background:  #050508;
    border: 1px solid rgba(255, 255, 255, 0.2); */

    /* Preset 02 */
    background: rgba(255,255,255,0.06);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    &:hover{
        background: #050508;
        box-shadow: 0 4px 28px 0 rgba(31, 38, 135, 0.3);
        /* transform: translateY(-2px); */
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }

    &:hover h3{
        opacity: 1;
    }
}
p{
margin: 1rem 0;
color: #747474;
/* Text Align Left */
text-align: center;
font-family: 'Roboto', sans-serif;
font-size: .9rem;

}

h3{
    text-align: center;
    color: #3991DD;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    letter-spacing: 3px;
    opacity: 0.7;
    font-size: 1.2rem;
    
}
`;
export const Wrapper = styled(motion.div)`
margin: 0rem 1rem;
`;
export const ProjectBanner = styled.div`
width: 100%;
margin: 10px auto;
  max-width: 1200px;
  min-height: 600px;
  max-height: 580px;
padding: 70px 50px;
position: relative;
display: flex;
justify-content:center;
&::after {
content: "";
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
background: rgba(32, 32, 32, 0.7);
background: linear-gradient(0deg, rgb(8, 8, 8) 0%, rgba(0, 0, 0, 0.6) 100%);
}
`;
export const Image = styled.div`
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
border-radius: 5px;
overflow: hidden;
img {
    /* Brightness Filter */
width: 100%;
height: 100%;
object-fit: fill;
object-position: center;
}
&::before {
content: "";
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
background: rgba(32, 32, 32, 0.7);
background: linear-gradient(
  -90deg,
  rgba(37, 37, 37, 0.2) 0%,
  rgba(15, 15, 15, 0.3) 100%
);
}
`;
export const Container = styled.div`
z-index: 100;
display: grid;
grid-template-columns: 1fr 1fr;
width: 100%;
position: relative;
.title-container {
width: 100%;
max-width: 500px;
display: flex;
flex-direction: column;
justify-content: space-between;
}
.title-container p{
position: relative;
margin: 1.5rem 0;
color: #747474;
width: 180%;
text-align: justify;
}
.course-title{
width: 150%;
}
.coursedescription{
font-size: 1.1rem;
}
.course-title h1 {
color: #ffffff;
font-weight: 600;
font-size: 2.0rem;
font-family: 'Signika', sans-serif;
line-height: 40px;
letter-spacing: 1px;
}
.about {
display: flex;
justify-content: flex-start;
align-items: center;
margin-top: 10px;
flex-wrap: wrap;
color: #e9e9e9;
}
.rating {
display: flex;
align-items: center;
justify-content: flex;
letter-spacing: 0.1rem;
img {
  height: 2rem;
  width: 2.4rem;
  object-fit: contain;
  object-position: center;
  margin: 0px 10px;
}
}
.about span {
margin-right: 1.1rem;
letter-spacing: 1px;
font-size: 0.8rem;
}
.title-bottom{
display: flex;
justify-content: flex-start;
align-items: center;
flex-wrap: wrap;
}
.btn {
border: none;
outline: 2px solid #3883c5;
background: transparent;
color: #3883c5;
cursor: pointer;
font-weight: bold;
padding: 5px 4px;
transition: 0.4s;
margin-top: 1rem;
margin-right: 0.9rem;
border-radius: 0.2rem;
}
.btn:hover{
transform: translateY(-0.3rem);
color: #355C7D;
outline: 2px solid #355C7D;
}
li{
float: left;
display: block;
color: white;
text-align: center;  
font-weight: bold;
color: #2f85d0;
font-size: 0.8rem;
}
li:not(:first-child){
  padding: 0rem 0.2rem;
}
.category{
margin-right: 40px;
font-size: 1.2rem;
display: flex;
flex-direction: column;
}
.category strong{
font-weight: 500;
color: #ffffff;
}
`;
// ==========  Card Image ==========
export const CardImage = styled.div`
width: 100%;
height: 100%;
border-radius: 1rem;
img {
border-radius: 1rem;
filter: brightness(0.8);

width: 100%;
height: 100%;
object-fit: cover;
object-position: center;
}
`;

export const TabHeading = styled.section`
width: 100%;
max-width: 800px;
margin: 0rem auto 0rem auto;
display: flex;  
justify-content: flex-start;
align-items:center;
flex-direction: column;
strong{
    /* color: #d3060a; */
    color: #FFFFFF;
    font-family: 'Signika', sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    padding: 1.2rem;
}
`;
export const Card = styled.div`
  z-index: 2;
  width: 300px;
  height: 350px;
  position: relative;
  border-radius: 1rem;
  margin-top: 1rem;
`;

export const VoteSelect = styled.select`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    height: 30px;
    background: transparent;
    font-size: 0.8rem;
    color: #3883c5;
    font-family: "Poppins", sans-serif;
    /* text-transform: uppercase; */
    cursor: pointer;
    transition: ease-in-out 0.5s;
    font-weight: bold;
    padding: 0px 15px;
    border: none;
    border-bottom: 2px solid #3883c5;
`;


export const DeleteReview = styled.button`
border-radius: 50%;
height: 15px;
width: 15px;
color: #d33838;
  background: #d33838;
font-size: 0.9rem;
font-family: "Poppins", sans-serif;
/* text-transform: uppercase; */
cursor: pointer;
transition: ease-in-out 0.5s;
font-weight: bold;
padding: 0px 3px;
border: none;
&:hover {
  background: #bf1e1e;
  box-shadow: 0 0 5px #d33838, 0 0 10px #d33838, 0 0 15px #d33838, 0 0 20px #d33838, 0 0 25px #d33838, 0 0 30px #d33838;

color: #fff;
}
`;


export const AlreadyReviewed = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    height: 30px;
    background: transparent;
    font-size: 1rem;
    color: #3883c5;
    font-family: "Poppins", sans-serif;
    /* text-transform: uppercase; */
    cursor: pointer;
    transition: ease-in-out 0.5s;
    font-weight: bold;
    margin-bottom: 20px;
    border: none;
`;
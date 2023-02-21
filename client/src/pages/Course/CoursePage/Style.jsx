import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styles

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

export const Btn = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  height: 30px;
  background: #3883c5;
  font-size:    0.8rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  /* text-transform: uppercase; */
  cursor: pointer;
  transition: ease-in-out 0.5s;
  font-weight: bold;
  border: none;
  padding: 0px 15px;

  &:hover {
    border: 3px solid #3883c5;
    color: #3883c5;
    background: transparent;
  }
`;

export const Wrapper = styled(motion.div)`
  margin: 0rem 1rem;
`;

export const CourseBanner = styled.div`
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
    background: linear-gradient(0deg, rgb(8, 8, 8) 0%, rgba(0, 0, 0, 0.8) 100%);
  }

  /* For Mobile Devices */
  @media only screen and (max-width: 768px) {
    min-height: 400px;
    max-height: 400px;
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    width:100%;
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
    /* For Mobile Devices */
    @media only screen and (max-width: 768px) {
    /* grid-template-columns: 1fr; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
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
    /* width 100% for mobile devices */
    @media only screen and (max-width: 768px) {
        width: 110%;
    }

}
.coursedescription {
    font-size: 1.1rem;
    @media only screen and (max-width: 768px) {      
      font-size: 0.6rem;
    }
}

  .coursedescription .description p{
    @media only screen and (max-width: 768px) {      
      max-width: fit-content;
    min-width: fit-content;    }

  }

  .course-title h1 {
    color: #ffffff;
    font-weight: 600;
    font-size: 2.0rem;
    font-family: 'Signika', sans-serif;
    line-height: 40px;
    letter-spacing: 1px;
    @media only screen and (max-width: 768px) {
      font-size: 1.6rem;
      line-height: 30px;
    }
  }
  .course-title .CourseCode{
    /* Light White Color */
    color: #d9d9d9;
    /* Reduce Opacity */
    opacity: 0.6;
  }
  .about {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    flex-wrap: wrap;
    color: #e9e9e9;
    width: 35%;
  }
  .rating {
    display: flex;
    align-items: center;
    justify-content: flex;
    letter-spacing: 0.1rem;
    @media only screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
    img {
      height: 1.4rem;
      width: 1.4rem;
      object-fit: contain;
      object-position: center;
      margin-left: 0.3rem;
      margin-right: 0.5rem;
      display:flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 5px;
      @media only screen and (max-width: 768px) {
        height: 1.2rem;
        width: 1.2rem;
        margin: 1px;
      }
    }
  }
  .votes{
    display: flex;
    align-items: center;
    justify-content: flex;
    letter-spacing: 0.1rem;
    margin-left: 5.5rem;
    img {
      height: 1.4rem;
      width: 1.4rem;
      object-fit: contain;
      object-position: center;
      margin-left: 0.3rem;
      margin-right: 0.5rem;
      display:flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 5px;;
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



export const CourseDetails = styled.section`
width: 100%;
max-width: 1000px;
margin: 2rem auto 1rem auto;
padding: 2rem;
display: flex;
flex-direction: column;
text-align: center;
p{
    margin: 1rem 0;
    color: #747474;
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
  .about {
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin-top: 10px;
    /* flex-wrap: wrap; */
    color: #e9e9e9;
    flex-direction: row;
    width: 100%;

  }
 
    .rating {
    display: flex;
    align-items: center;
    justify-content: flex;
    letter-spacing: 0.1rem;
    img {
      height: 1.4rem;
      width: 1.4rem;
      object-fit: contain;
      object-position: center;
      margin-left: 0.3rem;
      margin-right: 0.5rem;
      display:flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 5px;
  }
  }
  .votes{
    display: flex;
    align-items: center;
    justify-content: flex;
    letter-spacing: 0.1rem;
    img {
      height: 1.4rem;
      width: 1.4rem;
      object-fit: contain;
      object-position: center;
      margin-left: 0.3rem;
      margin-right: 0.5rem;
      display:flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 5px;;
    }
  }

  
`;

// ==========  Card Image ==========
export const CardImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  img {
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    object-fit: fill;
    object-position: center;
  }
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

export const TabButton = styled.button`
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


    /* Hover */
    &:hover{
    transform: translateY(-0.3rem);
    color: #355C7D;
    outline: 2px solid #355C7D;
    }

`;

export const CourseCard = styled.div`
  width: 120px;
  height: 150px;
  background: linear-gradient(
360deg,
#161616b9 35%,
rgba(73, 73, 73, 0.23) 64%
);
  /* position: relative; */
  transition: all ease 0.3s;
    /* border: 1px solid rgb(255, 255, 255); */
  border-radius: 1.4rem !important;
    /* Reduct Brightness */
    filter: brightness(0.9);
    &:hover {
        border: 1px solid #3582c6;
    }

    &:hover .body {
        opacity: 1;
    }
`;

export const CourseCardImage = styled.div`
    border-radius: 1.4rem;
    width: 100%;
    height: 100%;
    background: linear-gradient(
360deg,
#161616b9 35%,
rgba(73, 73, 73, 0.23) 64%
);
    img {
        border-radius: 1.4rem;
        filter: brightness(0.9);

        width: 100%;
        height: 100%;
        object-fit: fill;
        object-position: center;
    }
`;


export const Grid = styled(motion.div)`
    padding: 1.5rem 0rem;
    .courses {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 4.5rem 1rem;
    }
    .nocourses {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        h1 {
            font-size: 1.5rem;
            font-weight: 500;
            color: #000;
        }
    }
`;
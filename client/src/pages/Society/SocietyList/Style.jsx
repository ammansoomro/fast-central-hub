import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Grid = styled(motion.div)`
  margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 2.9rem;
`;
// ========== Setting Margin ==========
export const Wrapper = styled.div`
  margin: 4rem 8rem;
`;


// ========== Slider Item Card ==========
export const Card = styled(motion.div)`
  width: 200px;
  height: 270px;
  position: relative;
    transition: all ease 0.3s;
    /* border: 1px solid rgb(255, 255, 255); */
    border-radius: 1.4rem !important;

    &:hover {
        border: 1px solid #3582c6;
    }

    &:hover .body {
        opacity: 1;
    }
`;

// ==========  Card Image ==========
export const CardImage = styled(motion.div)`
    border-radius: 1.4rem;
    width: 100%;
    height: 100%;

    img {
        border-radius: 1.4rem;

        width: 100%;
        height: 100%;
        object-fit: fill;
        object-position: center;
    }
`;

// ==========  Card Text ==========
export const CardText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 1.4rem !important;

  background: linear-gradient(
    360deg,
    #161616b9 35%,
    rgba(73, 73, 73, 0.23) 64%
  );
  display: flex;
    flex-direction: column;
    padding: 10px 15px;
    justify-content: space-between;

  // ==========  HD Label Text ==========
  .quality {
    background-color: #e70634;
    color: #080808;
    font-weight: 600;
    padding: 0px 0.5rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    border-radius: 4px;
    opacity: 0;
  }
  // ==========  society Name ==========
  .societyname {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .societyname strong {
    font-size: 1rem;
        line-height: 20px;
        margin-top: 5px;
        margin-bottom: 15px;
        color: #dfdfdf;
        letter-spacing: 0.5px;
  }
  // ==========  Rating ==========
  .rating {
        display: flex;
        align-items: center;
        justify-content: flex;
        letter-spacing: 0.1rem;

        img {
            height: 0.9rem;
            width: 1rem;
            object-fit: contain;
            object-position: center;
            margin: 0px 10px;
        }
    }
`;

export const CardHover = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transition: 0.5s;
  padding: 10px;
  background: linear-gradient(90deg, #000000b5 100%, #fafafa 0%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 1.4rem !important;

  h2 {
    margin-top: 30%;
  }
  h4 {
    margin-bottom: 40%;
  }
  .btn {
        border: none;
        outline: 2px solid #3883c5;
        background: transparent;
        color: #3883c5;
        cursor: pointer;
        font-weight: bold;
        padding: 5px 10px;
        transition: 0.4s;
    }

    .btn:hover {
        color: #355C7D;
        outline: 2px solid #355C7D;
    }
`;


// SEARCH BAR

export const Searchbar = styled.div`
    display: block;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    @media screen and (max-width: 768px) {
    margin-top: 50px;
    width: 100%;
  }
    input {
        width: 100%;
        padding: 0.5rem 0.5rem;
        transition: transform 250ms ease-in-out;
        font-size: 14px;
        line-height: 18px;
        color: white;
        background-color: #83828233;
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: 99% center;
        border: none;
        border-bottom: 2px solid #3991dd;
        transition: all 250ms ease-in-out;

        &::placeholder {
            color: rgba(250,250,250,0.5);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-size: 0.75rem;
        }
        
        &:hover,
        &:focus {
            background-position: 100% center;
        }
    }
`;

export const TopMenu = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding: 0 1rem;

    /* If Screen Size Gets Smaal Change Flex Direction to Column */
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;


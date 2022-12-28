import React, { useState } from 'react'
import wave from "./wave.png";
import logo from "./login_logo.svg";
import avatar from "./login_avatar.svg";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Signup = () => {
  const nav = useHistory();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''
  })



  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
    console.log(user)
  }
  const PostData = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = user;
    if (!username || !email || !password || !cpassword) {
      swal({
        title: "Missing Details!",
        text: "Kindly fill all the Details",
        icon: "warning",
        button: false,
        timer: 1200
      })
    } 
    // Email Must start with K or k, have 6 digits after that, and end with @nu.edu.pk
    else if (!email.match(/^k[0-9]{6}@nu.edu.pk$/)) {
      swal({
        title: "Invalid Email!",
        text: "Please use your Correct NU Email",
        icon: "error",
        button: false,
        timer: 1200
      })
    } else if (password !== cpassword) {
      swal({
        title: "Incorrect Password!",
        text: "Password and Confirm Password should be same",
        icon: "error",
        button: false,
        timer: 1200
      })
    } else if (password.length < 8 || cpassword.length < 8) {
      swal({
        title: "Weak Password!",
        text: "Password should be atleast 8 characters long",
        icon: "error",
        button: false,
        timer: 1800
      })
    } else {
      const res = await fetch('/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, email, password
        })
      })
      const data = await res.json();
      if (res.status === 400 || !data) {
        swal("Email or Username Already Exists!", "Please Use Another One.", "error");
        console.log("Invalid Registration")
      } else {
        // Swal Success Message, then auto redirect to login page after 0.5 seconds
        swal({
          title: "Registration Successful!",
          text: "Redirecting to Login Page.",
          icon: "success",
          button: false,
          timer: 1200
        }).then(function () {
          nav.push("/login");
        });

        console.log("Registration Successful")
        setUser({
          name: '',
          email: '',
          password: '',
          cpassword: ''
        })
        // navigate("/signin");
      }
    }
  }


  return (
    <>
      <GlobalStyle />
      <Wave src={wave} alt="wave" />
      {/* Use SVG */}
      <Container>
        <Image >
          <img src={logo} alt={logo} />
        </Image>
        <LoginContent >
          <Form id="login-form">
            <img className="avatar" src={avatar} alt="avatar" />
            <div className="input-div">
              <Myinput>
                <Icon className="i">
                  <AiOutlineUser />
                </Icon>
                <Wrapper>
                  <Input placeholder="Username" type="text" name="username" id="username" value={user.username} onChange={handleInputs} />
                </Wrapper>
              </Myinput>

              <Myinput >
                <Icon className="i">
                  <HiOutlineMail />
                </Icon>
                <Wrapper>
                  <Input placeholder="NU Email" type="email" name="email" id="email" value={user.email} onChange={handleInputs} />
                  <Validation>* Invalid Email</Validation>
                </Wrapper>
              </Myinput>

              <Myinput >
                <Icon className="i">
                  <RiLockPasswordLine />
                </Icon>
                <Wrapper>
                  <Input placeholder='Password' type="password" name="password" id="password" value={user.password} onChange={handleInputs} />
                </Wrapper>
              </Myinput>

              <Myinput >
                <Icon className="i">
                  <RiLockPasswordFill />
                </Icon>
                {/* Validation if password and Confirm Password are equal */}
                <Wrapper>
                  <Input placeholder='Confirm Password' type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs} />
                </Wrapper>
              </Myinput>
              <Btn type="submit" value="Register" onClick={PostData} />
              <Link to="/login" className="link" style={{ color: "white" }}
              >Already have an account?</Link>
            </div>
          </Form>
        </LoginContent>
      </Container>
    </>
  )
}

export default Signup

const GlobalStyle = createGlobalStyle`
  body {
    background: #0a4e33ed;
  }
`;

const Validation = styled.div`
  /* Style One */
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translate(5rem, -50%);
  opacity: 0;
  color: #f9f9f9;
  transition: all 0.35ms;
  font-size: 0.6rem;
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

`;

const Wave = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Myinput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  position: relative;
  height: 45px;
  margin: 50px 0;
`;

const Btn = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  width: 100%;
  height: 3rem;
  border-radius: 2rem;
  background: #2fd09b;
  font-size: 1.2rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin: 2rem 0;
  cursor: pointer;
  transition: ease-in-out 0.5s;
  font-weight: bold;
  border: none;

  &:hover {
    border: 3px solid #38d39f;
    color: #38d39f;
    background: transparent;
  }
`;
const Input = styled.input`
  transition: ease-in-out 0.3s;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: ghostwhite;
  font-family: "poppins", sans-serif;
  border-bottom: 2px solid #26d69b80;
  

  &:valid {
    border-color: #55d688;}

  &:invalid {
    border-color: #fd4444;}
  
  &:invalid ~ ${Validation} {
    opacity: 1;
    transform: translate(0, -50%);}
  /* Focus */
  &:focus {
    transition: 0.5s;
    border-bottom: 2px solid #24d59afa;
  }

  /* Input Focus Placeholder */
  &:focus::placeholder {
    color: transparent;
  }

  &::placeholder {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #fafafa;
    font-size: 18px;
    transition: 0.3s;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15rem;
  padding: 0 2rem;
  @media screen and (max-width: 1050px) {
    grid-gap: 5rem;
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Image = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    margin-bottom: 17rem;
    width: 400px;
	/* width: 500px; */
  }

  @media screen and (max-width: 900px) {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    img {
      width: 400px;
    }
  }
`;

const LoginContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin-bottom: 14rem;
  padding: 3rem 0rem;
  img {
    height: 120px;
  }

  h2 {
    margin: 15px 0;
    color: #333;
    text-transform: uppercase;
    font-size: 2.9rem;
  }

  @media screen and (max-width: 900px) {
    justify-content: center;
  }

  @media screen and (max-width: 1000px) {
    h2 {
      font-size: 2.4rem;
      margin: 8px 0;
    }
  }
`;

const Form = styled.form`
  width: 360px;
  @media screen and (max-width: 1000px) {
    width: 290px;
  }
`;

const Icon = styled.div`
  color: #79847d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

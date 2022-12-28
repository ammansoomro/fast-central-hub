import React from 'react'
import styled from 'styled-components'

const Loader = () => {
  return (
    <LoadingBody>
        <div className="container">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
        </div>
    </LoadingBody>
  )
}


const LoadingBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;
    background: #020202;
    .container{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ring{
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 0px solid #011015;
      position: absolute;
    }

    /* ring nth child 1 */
    .ring:nth-child(1){
      border-bottom-width: 10px;
      border-color: #005bab;
      animation: rotate1 1s linear infinite;
    }

    .ring:nth-child(2){
      border-right-width: 10px;
      border-color: #038aff;
      animation: rotate2 1s linear infinite;
    }

    .ring:nth-child(3){
      border-top-width: 10px;
      border-color: #4d9de4;
      animation: rotate3 1s linear infinite;
    }
    /* keyframes rotate */
    @keyframes rotate1{
      0%{
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
      }
      100%{
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
      }
    }

    @keyframes rotate2{
      0%{
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
      }
      100%{
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
      }
    }

    @keyframes rotate3{
      0%{
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
      }
      100%{
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
      }
    }
        `;

export default Loader
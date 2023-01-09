import SocietyItem from '../../cards/SocietyCard/SocietyCard'
import './SocietyList.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
const Swiper = () => {
    const [societies, setSocieties] = useState([]);
    useEffect(() => {
        const getSocieties = async () => {
            try {
                const res = await axios.get("/societies", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setSocieties(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getSocieties();
    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "5px",
        slidesToShow: 5,
        speed: 500,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <Wrapper >
                <div className="SectionHeading">
                    <h1>University Societies</h1>
                </div>
                <Slider
                    {...settings}
                >
                    {/* Map Over Societies */}
                    {societies.map((society) => (
                        <SocietyItem
                            imageUrl={society.picture}
                            societycode={society.code}
                            name={society.name}
                            id={society._id}
                        />
                    ))}
                </Slider>
            </Wrapper>
        </>
    )
}

export default Swiper

const Wrapper = styled.div`
        margin: 4rem 3.5rem;
        @media screen and (max-width: 600px) {
            margin: 2rem 0rem;
        }
`;
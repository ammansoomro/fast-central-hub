import DepartmentItem from '../../cards/DepartmentCard/DepartmentCard'
import './departmentlist.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Slider from "react-slick";
const Swiper = () => {
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        const getDepartments = async () => {
            try {
                const res = await axios.get("/departments", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setDepartments(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getDepartments();
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
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

    return (
        <>
            <Wrapper >
                <div className="SectionHeading">
                    <h1>University Departments</h1>
                </div>
                <Slider
                    {...settings}
                >
                    {/* Map Over Departments */}
                    {departments.map((department) => (
                        <DepartmentItem 
                            name={department.name}
                            picture = {department.picture}
                            code = {department.code}
                            id = {department._id}
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
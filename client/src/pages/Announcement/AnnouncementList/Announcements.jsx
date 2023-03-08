import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Wrapper, Grid, Card, CardImage, CardHover, CardText, TopMenu, Searchbar } from './Style.jsx'

const Departments = () => {

    return (
        <Wrapper>
            <TopMenu>
                <Searchbar>
                    <input class="search__input" type="text" placeholder="Quick Search" />
                </Searchbar>
            </TopMenu>
            <Grid
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}>
                {
                    <>

                        <Link
                            to={{
                                pathname: `/announcement/Student`,
                            }}
                            key="Test"
                        >
                            <Card key="Test"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <CardImage>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Announcements%2FStudetAff.png?alt=media&token=16d109b9-104c-49e1-9b58-7d3c91f27bf9" alt="Student Affairs" />
                                </CardImage>
                                <CardHover className="body">
                                    <h2>Student Affairs</h2>
                                    <Link
                                        to={{
                                            pathname: `/announcement/Student`,
                                        }}
                                    >
                                        <button className="btn">View Announcements</button>
                                    </Link>
                                    <h4> </h4>
                                </CardHover>
                                <CardText>
                                    <span className="quality"></span>
                                    <div className="bottom">
                                        <div className="departmentname">
                                            {/* <span>{department.code}</span> */}
                                            <strong>Student Affairs</strong>
                                        </div>
                                    </div>
                                </CardText>
                            </Card>
                        </Link>

                        <Link
                            to={{
                                pathname: `/announcement/Academic`,
                            }}
                            key="Test"
                        >
                            <Card key="Test"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <CardImage>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Announcements%2FAcademic.png?alt=media&token=3e771f28-88c8-4445-9f0c-6e81e0074a5b" alt="Academic" />
                                </CardImage>
                                <CardHover className="body">
                                    <h2>Academic Affairs</h2>
                                    <Link
                                        to={{
                                            pathname: `/announcement/Academic`,
                                        }}
                                    >
                                        <button className="btn">View Announcements</button>
                                    </Link>
                                    <h4> </h4>
                                </CardHover>
                                <CardText>
                                    <span className="quality"></span>
                                    <div className="bottom">
                                        <div className="departmentname">
                                            {/* <span>{department.code}</span> */}
                                            <strong>Academic Affairs</strong>
                                        </div>
                                    </div>
                                </CardText>
                            </Card>
                        </Link>

                        <Link
                            to={{
                                pathname: `/announcement/Societies`,
                            }}
                            key="Test"
                        >
                            <Card key="Test"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <CardImage>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Announcements%2FSocieties.png?alt=media&token=5538f4ef-ce2d-47b5-8ee8-137feed63566" alt="Society" />
                                </CardImage>
                                <CardHover className="body">
                                    <h2>Societies</h2>
                                    <Link
                                        to={{
                                            pathname: `/announcement/Societies`,
                                        }}
                                    >
                                        <button className="btn">View Announcements</button>
                                    </Link>
                                    <h4> </h4>
                                </CardHover>
                                <CardText>
                                    <span className="quality"></span>
                                    <div className="bottom">
                                        <div className="departmentname">
                                            {/* <span>{department.code}</span> */}
                                            <strong>Societies</strong>
                                        </div>
                                    </div>
                                </CardText>
                            </Card>
                        </Link>

                        <Link
                            to={{
                                pathname: `/announcement/Career`,
                            }}
                            key="Test"
                        >
                            <Card key="Test"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <CardImage>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Announcements%2FCareer.png?alt=media&token=ef1a35bc-f372-4d7d-b1a2-df157b23514a" alt="Career" />
                                </CardImage>
                                <CardHover className="body">
                                    <h2>Career Services</h2>
                                    <Link
                                        to={{
                                            pathname: `/announcement/Career`,
                                        }}
                                    >
                                        <button className="btn">View Announcements</button>
                                    </Link>
                                    <h4> </h4>
                                </CardHover>
                                <CardText>
                                    <span className="quality"></span>
                                    <div className="bottom">
                                        <div className="departmentname">
                                            <strong>Career Services</strong>
                                        </div>
                                    </div>
                                </CardText>
                            </Card>
                        </Link>


                        <Link
                            to={{
                                pathname: `/announcement/Others`,
                            }}
                            key="Test"
                        >
                            <Card key="Test"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <CardImage>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/fastcentralhub.appspot.com/o/Announcements%2Fother.png?alt=media&token=d781aae3-454c-4d28-bbd0-19ae312f8b91" alt="Other" />
                                </CardImage>
                                <CardHover className="body">
                                    <h2>Others</h2>
                                    <Link
                                        to={{
                                            pathname: `/announcement/Others`,
                                        }}
                                    >
                                        <button className="btn">View Announcements</button>
                                    </Link>
                                    <h4> </h4>
                                </CardHover>
                                <CardText>
                                    <span className="quality"></span>
                                    <div className="bottom">
                                        <div className="departmentname">
                                            <strong>Others</strong>
                                        </div>
                                    </div>
                                </CardText>
                            </Card>
                        </Link>

                    </>

                }
            </Grid>
        </Wrapper>
    )
}

export default Departments 
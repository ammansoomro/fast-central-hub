import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GetSocietyData, GetSocietyEvents } from './Functions';
import { Wrapper, SocietyBanner, Image, Container, Card, CardImage, SocietyDetails } from './Style';

const SocietyPage = () => {
    const params = useParams();
    const [society, setSociety] = useState({});
    const [societyAbout, setSocietyAbout] = useState("");
    const [events, setEvents] = useState([
        {
            name: "Loading...",
            description: "Loading...",
            societyCode: "Loading...",
        },
    ]);

    useEffect(() => {
        const PullData = async () => {
            try {
                const data = await GetSocietyData(params);
                setSociety(data);
                setSocietyAbout(data.description);
                const data2 = await GetSocietyEvents(params);
                setEvents(data2);
            } catch (err) {
                console.log(err);
            }
        };
        PullData();
    }, [params.id]);


    return (
        <Wrapper
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}>
            <SocietyBanner>
                <Image>
                    {
                        <img src={society.background} alt="Please Wait, Fetching Data..." />
                    }
                </Image>
                <Container>
                    <div className="title-container">
                        <div className="title-top">
                            <div className="course-title">
                                <h1>{society.name}</h1>
                            </div>
                            <div className="about">
                                <span>{society.code}</span>
                            </div>
                            <div className="societydescription">
                                {/* IF No Society About then do this else that */}
                                {
                                    society.description === "" ?
                                        <p>No Description Available for this Society.</p>
                                        :
                                        <p>{societyAbout.substring(0, 1850)}</p>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
                <Card>
                    <CardImage>
                        <img src={society.picture} alt="Please Wait, Fetching Data..." />
                    </CardImage>
                </Card>
            </SocietyBanner>
            <SocietyDetails>
                <h1>Society Events</h1>
                {
                    events.map((event) => {
                        return (
                            <div className="eventdetails">
                                <div className="eventname">
                                    <h3>{event.name}</h3>
                                </div>
                                <div className="eventdescription">
                                    <p>{event.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </SocietyDetails>
        </Wrapper>
    );
}
export default SocietyPage;
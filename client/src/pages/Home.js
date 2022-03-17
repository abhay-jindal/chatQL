import { Row, Image, Col, Button } from "react-bootstrap";
import style from '../utils/style/home.module.css';
import { Link } from "react-router-dom";


export default function Home() {
    
    return (
        <Row className="justify-content-center my-5 mx-0" >
            <Col xs={12} sm={9} md={6} lg={3}>

                <div className="mt-5">
                    <h1 className={style.WelcomeHeader}>Welcome! <Image src='https://res.cloudinary.com/chatql/image/upload/icon-handwave_sbdi5t.png' height={60}/></h1>

                    <hr />
            
                    <div style={{  fontSize: '1.1em', lineHeight: '1.83341', fontWeight: '450', opacity: '.75', letterSpacing: '-.025em'}}>
                        <p >
                            We're working hard to get chatQL ready for everyone!
                        </p>
                        <p>
                            chatQL is a thoughtful and generous place — where you bump into old friends and make new ones too.
                            We are so grateful you're here and can't wait to have you join!
                        </p>
                        <p>
                            Every day, people are telling jokes, reading the morning news, making music together, and 
                            sharing deep thoughts. What about you?
                        </p>
                    </div>

                    <div className={style.HomeButton}>
                        <Button className='px-4 py-2 mt-4' variant="dark"  >
                            Get your username
                        </Button>
                        
                        <Link exact="true" to="/account/login" className='d-flex align-items-center my-3' >Already have an account? Sign in</Link>
                    </div>
                </div>
        
            </Col>
        </Row>
    )
}
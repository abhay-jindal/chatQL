
import { Navbar, Container, Nav, Image } from "react-bootstrap"
import { useMessageDispatch } from "../../context/message"

export default function MessagesNavbar({ user }) {
    const dispatch = useMessageDispatch()

    const handleBackClick = () => {
        dispatch({ type: 'UNSELECT_SELECTED_USER', payload: {}})
    }
    
    return (
        <Navbar style={{ cursor:"pointer"}} bg="light" className='border-bottom py-2'>
            <i className="fa-solid fa-chevron-left" onClick={handleBackClick}></i>
            <Container>
                <Nav.Link className='text-success p-0 mx-3' href="#"><Image src={user?.imageURL || 'https://www.gravatar.com/avatar?d=mp&f=y'} roundedCircle height={35} width={35} /> &nbsp; {user?.username}</Nav.Link>
                <Nav.Link className='text-success p-0' href="https://mail.google.com/mail/?fs=1&to=jindal1808@gmail.com&tf=cm" target="_blank">
                    <u>Direct Mail</u>
                </Nav.Link>
            </Container>
        </Navbar>
    )
}
import { Navbar as Nav, Container } from 'react-bootstrap'

export default function Navbar({ handleClick }) {

  return (
      <Nav bg="dark" variant="dark">
      <Container style={{ cursor:"pointer"}}>
        <Nav.Brand onClick={(event) => handleClick('/dashboard', event)}>chatQL</Nav.Brand>
          <Nav.Text onClick={(event) => handleClick('/account', event)}><u>Account</u></Nav.Text>
          <Nav.Text onClick={(event) => handleClick('/', event)}><u>LogOut</u></Nav.Text>
      </Container>
    </Nav>
  )
}
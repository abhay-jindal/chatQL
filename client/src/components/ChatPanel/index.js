import { Row, Container } from 'react-bootstrap'
import Users from './Users'
import Messages from './Messages'


export default function ChatPanel() {
    return (
        <Container className="pt-2">
            <Row className="bg-white">
                <Users />
                <Messages />
            </Row>
        </Container>
    )
}
import { Row, Container } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Register from './Register'
import { Fragment } from 'react'



export default function AccountPanel() {
    return (
        <Container className="pt-2">
            <Row className="bg-white">
                <Sidebar />
                <Fragment>
                {/* {(() => {
        switch (game) {
          case 'start':
            return <Start handleClick={handleClick} />
          case 'playing':
            return <Playing handleClick={handleClick} />
          case 'won':
            return <Won handleClick={handleClick} />
          case 'lost':
            return <Lost handleClick={handleClick} />
          default:
            return null
        }
      })()} */}
                </Fragment>
                <Register /> 
            </Row>
        </Container>
    )
}
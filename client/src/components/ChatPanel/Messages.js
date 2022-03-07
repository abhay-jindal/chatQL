import { useEffect, useState, useMemo, Fragment } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Button, Col, Container, Form, Stack } from 'react-bootstrap'
import { useMessageDispatch, useMessageState } from '../../context/message'
import Message from './Message'
import MessagesNavbar from './MessagesNavbar'


const SEND_MESSAGE = gql`
  mutation sendMessage($to: String! $content: String!) {
    sendMessage(to: $to content: $content) {
      uuid from to content createdAt
    }
  }
`;

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`

export default function Messages() {
  const { users } = useMessageState()
  const dispatch = useMessageDispatch()
  const [ content, setContent ] = useState('')

  const selectedUser = users?.find((u) => u.selected === true)
  const messages = selectedUser?.messages

  const [ getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES)
  const [ sendMessage ] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err),
  })

  const submitMessage = event => {
    event.preventDefault()
    if (content.trim() === '' || !selectedUser) return
    setContent('')

    // mutation for sending the message
    sendMessage({ variables: { to: selectedUser.username, content } })
  }

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } })
    }
  }, [selectedUser])

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: 'SET_USER_MESSAGES',
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      })
    }
  }, [messagesData])

  const selectedChatMarkup = useMemo(() => {
    if (!messages && !messagesLoading) {
      return <p className='info-text'>Welcome to chatQL <img alt='' src="https://img.icons8.com/color/30/000000/chat--v3.png"/></p>
    } else if (messagesLoading) {
      return <p className='info-text'>Loading..</p>
    } else if (messages.length > 0) {
    
      return messages.map((message, index) => (
        <Message key={index} message={message} />
      ))
    } else if (messages.length === 0) {
      return <p className='info-text'>Start an conversation! 👋</p>
    }
  }, [messages, messagesLoading])


  return (
    <Col xs={12} md={8} >
      { selectedUser ? 
          <Fragment>
            <MessagesNavbar user={selectedUser} />
            <div className="messages-box d-flex my-1 flex-column-reverse">
              {selectedChatMarkup}
            </div>
            <div>
              <hr></hr>
              <Form onSubmit={submitMessage}>
                <Form.Group className="d-flex">
                  <Form.Control
                    type="text"
                    className="mb-3 p-2 bg-light border-0"
                    placeholder="Type a message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
               
                </Form.Group>
              </Form>
            </div>
          </Fragment>
        : <div className="messages-box pt-2">
            {selectedChatMarkup}
            <Container className='pt-5'>
              <Stack gap={4} className="col-md-5 mx-auto">

                <Button variant="success" type="submit" size="md">Organize event &nbsp; <i className="fa-solid fa-calendar"></i></Button>
                <Button variant="secondary" type="submit" size="md">Host an space &nbsp; <i className="fa-solid fa-user-group"></i></Button>
              </Stack>  
            </Container>
          </div>
      }
    </Col>
  )
}
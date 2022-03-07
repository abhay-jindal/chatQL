import { useAuthDispatch, useAuthState } from '../context/auth'
import { Fragment, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSubscription, gql } from '@apollo/client'
import ChatPanel from '../components/ChatPanel'
import { useMessageDispatch } from '../context/message'
import { useHistory } from 'react-router-dom'

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid content createdAt from to
    }
  }
`

export default function Dashboard() {
  const userDispatch = useAuthDispatch()
  const messageDispatch = useMessageDispatch()
  const { user } = useAuthState()
  const history = useHistory()
  const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE)

  const handleClick = (name, event) => {
    event.preventDefault()
    switch (name) {  
      case '/':
        userDispatch({ type: 'LOGOUT' })
        window.location.href = "/"
        break;
      case '/account':
        history.replace({ pathname: name, state:{isActive: true}})
        break;
      default:
        messageDispatch({ type: 'UNSELECT_SELECTED_USER', payload: {}})
    }
  };

  useEffect(() => {
    if (messageError) console.log(messageError)
    if (messageData) {
      const message = messageData.newMessage

      const otherUser = user.username === message.to ? message.from : message.to
      messageDispatch({ type: 'ADD_MESSAGE', payload: {
        username: otherUser,
        message: message
      }})
    }
  }, [messageData, messageError])

  return (
    <Fragment>
      <Navbar handleClick={handleClick} />
      <ChatPanel />
    </Fragment>
  )
}
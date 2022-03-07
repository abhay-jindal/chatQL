import { Col, Image } from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client'
import SearchBar from '../../utils/SearchBar';

import { useMessageDispatch, useMessageState } from '../../context/message'
import { Fragment } from 'react';

const GET_USERS = gql`
  query getUsers {
    getUsers { 
      username imageURL createdAt latestMessage {
        uuid content from to createdAt
      }
    }
  }
`;


export default function Users() {
    const dispatch = useMessageDispatch()
    const { users } = useMessageState()
    const selectedUser = users?.find((u) => u.selected === true)?.username
   
    const { loading } = useQuery(GET_USERS, {
        
        onCompleted: (data) => dispatch({ type: 'SET_USERS', payload: data.getUsers }),
        onError: (err) => console.log(err),
    })
    
    let usersMarkup
    
    if (!users || loading) {
        usersMarkup = <p className='info-text mt-4'>Loading...</p>
    } else if (users.length === 0) {
        usersMarkup = <p className='info-text mt-4'>No users have joined yet</p>
    } else if (users.length > 0) {
        
        usersMarkup = users.flatMap((user) => {
            if (!user.latestMessage) return false
            const style = {
                cursor: 'pointer',
                backgroundColor: selectedUser === user.username ? '#d3d3d3' : ''
            }

            let latestMessage = user.latestMessage.content
            latestMessage = latestMessage.length > 35 ? `${latestMessage.slice(0,30)}....` : latestMessage
            
            return (
                    
                <div className="user-div d-flex justify-content-center justify-content-md-start p-2" style={style} key={user.username} onClick={() =>
                    dispatch({ type: 'SET_SELECTED_USER', payload: user.username })
                }>
                    <Image src={user.imageURL || 'https://www.gravatar.com/avatar?d=mp&f=y'} roundedCircle className='mr-2 user-image' />
                    <div className='d-none d-md-block mx-2'>
                    <p className="text-success">{user.username}</p>
                    <small className="text-muted">
                        {latestMessage}
                    </small>
                    </div>
                </div>
            )
        })
    }

    return (
        <Fragment>

            <Col xs={12} md={4} style={{ backgroundColor: '#ebecf0'}} className="users-box p-0 flex-wrap d-md-block d-flex">
                <Col md={12} xs={12} className="search-box p-0 d-md-block"><SearchBar /></Col>
                <hr />
                <div className='user-markup d-md-block d-flex'>{usersMarkup}</div>
            </Col>          
        </Fragment>
    )
}
import Navbar from '../components/Navbar'
import AccountPanel from '../components/AccountPanel'
import { Fragment } from 'react'
import { useAuthDispatch } from '../context/auth'
import { useMessageDispatch } from '../context/message'
import { useHistory } from 'react-router-dom'

export default function Account() {

    const userDispatch = useAuthDispatch()
    const messageDispatch = useMessageDispatch()
    const history = useHistory()

    const handleClick = (name, event) => {
        event.preventDefault()
        switch (name) {  
            case '/':
                userDispatch({ type: 'LOGOUT' })
                window.location.href = "/"
                break;
            case '/account':
                break;
            default:
                history.replace({ pathname: name, state:{isActive: true}})
        }
    };

    return (
        <Fragment>
            <Navbar handleClick={handleClick}/>
            <AccountPanel />
        </Fragment> 
    )
}
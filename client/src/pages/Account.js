import { useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";
import style from '../utils/style/account.module.css';


export default function Account({ match }) {
    const state = match?.params?.action.toUpperCase() || 'LOGIN'

    const [ action, setAction ] = useState( state === 'LOGIN' ? 'LOGIN' : 'REGISTER')

    /* change login, register component on the basis of action state defined above */
    const switchAuthComponent = () => {
        switch (action) {
            case 'LOGIN':
                return <Login changeAction={setAction}/>
            case 'REGISTER':
                return <Register changeAction={setAction}/>
            default:
                return <h1>nn</h1>
        }
    }

    console.log(match)
    // console.log(match)

    return (
        <Row className={`justify-content-center my-5 mx-0 ${style.AccountHeader}` } >
            {switchAuthComponent()}
            {/* <h2>{match.params.action}</h2> */}
        </Row>
    )
}
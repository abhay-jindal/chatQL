import Register from "../components/Register";
import Login from "../components/Login";
import { useState } from "react";

export default function Home() {
    const [ action, setAction ] = useState('LOGIN')

    switch(action) {
        case 'LOGIN':
            return <Login changeAction={setAction}/>
        case 'REGISTER':
            return <Register changeAction={setAction}/>
        default:
    }
}
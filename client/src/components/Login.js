import { useState } from 'react'
import { Row, Col, Form, Button, Image } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/client'
import { useAuthDispatch } from '../context/auth'
import { LOGIN_USER } from '../utils/ApolloService/Queries'
import style from '../utils/style/account.module.css';

export default function Login(props) {
    const [ values, setValues ] = useState({
        username: '',
        password: '',
        remember: 'off'
    })
    const [ errors, setErrors ] = useState({})
    const dispatch = useAuthDispatch()

    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
        onCompleted(data) {
            dispatch({ type: 'LOGIN', payload: data.login })
            window.location.href = '/dashboard'
        },
      })

    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser({ variables: values })
    }

    const handleChange = (event) => {
        let { name, value } = event.target
        setValues({ ...values, [name]: value })
        // setErrors(errors => ( { ...errors, [name]: null } ))
    };

    // const loginValues = {username: '', password: ''}
    // const { handleChange, handleSubmit, values } = useFormHook(loginUser, loginValues)

    return (
        // <Fragment>
        <Col xs={12} sm={9} md={6} lg={3}>
            <div className=" d-flex flex-column align-items-center"> 
                <Image src="https://res.cloudinary.com/chatql/image/upload/chat--v3_j7wurk.png" />
                <h1 className="m-2">Login to chatQL</h1>
            </div>

            <hr />

           
            
            <Form className={style.InputText} onSubmit={handleSubmit}> 
                
                <Form.Group className="my-4">
                    <Form.Floating>
                        <Form.Control
                        type="text"
                        name="username"
                        placeholder='Username'
                        autoComplete='off'
                        isInvalid={ errors?.username }
                        onBlur={handleChange}
                        />
                        <label htmlFor="username">Username</label>
                    </Form.Floating>
                    <p className="mt-1 text-danger">{ errors?.username && <i className="mx-1 fa-solid fa-sm fa-circle-exclamation"></i> } { errors.username }</p>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Floating>
                        <Form.Control
                        type="password"
                        placeholder='Password'
                        name="password"
                        isInvalid={ errors.password }
                        onBlur={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                    </Form.Floating>
                    <p className="mt-1 text-danger">{ errors?.password && <i className="mx-1 fa-solid fa-sm fa-circle-exclamation"></i> } { errors.password }</p>
                </Form.Group>

                <Form.Group as={Row} className="mb-4 mx-1">
                    <Form.Check label="Remember me" name="remember" onChange={handleChange} />  
                </Form.Group>
                
                <Button className='text-primary px-3' variant="light" onClick={() => props.changeAction('REGISTER')} >
                    Create account
                </Button>
                <Button className='px-4' style={{ float: 'right'}} variant="dark" type="submit"  disabled={loading}>
                    {loading ? 'loading...' : 'Log In'}
                </Button>
            </Form>
        </Col>
    )
}
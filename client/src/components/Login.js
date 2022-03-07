import { useState } from 'react'
import { Row, Col, Form, Button, Image } from 'react-bootstrap'
import { gql, useLazyQuery } from '@apollo/client'
import { useAuthDispatch } from '../context/auth'

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      imageURL
      createdAt
      token
    }
  }
`

export default function Login(props) {
    const [ values, setValues ] = useState({
        username: '',
        password: ''
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
        setErrors(errors => ( { ...errors, [name]: null } ))
    };

    return (
        <Row className="justify-content-center mt-5">
        <Col xs={11} sm={12} md={9} lg={4}>
            <div className="image d-flex flex-column p-0 align-items-center"> 
                <Image src="https://img.icons8.com/color/50/000000/chat--v3.png" />
                <div className="name m-2">Login to chatQL</div>
            </div>

            <hr />
            
            <Form onSubmit={handleSubmit}> 
                
                <Form.Group className="my-4 text">
                    <Form.Floating>
                        <Form.Control
                        type="text"
                        name="username"
                        placeholder='Username'
                        autoComplete='off'
                        isInvalid={ errors?.username }
                        onChange={handleChange}
                        />
                        <label htmlFor="floatingInputCustom">Username</label>
                    </Form.Floating>
                    <p className="mt-1 text-danger">{ errors?.username && <i className="mx-1 fa-solid fa-sm fa-circle-exclamation"></i> } { errors.username }</p>
                </Form.Group>

                <Form.Group className="mb-4 text">
                    <Form.Floating>
                        <Form.Control
                        type="password"
                        placeholder='Password'
                        name="password"
                        autoComplete='off'
                        isInvalid={ errors.password }
                        onChange={handleChange}
                        />
                        <label htmlFor="floatingInputCustom">Password</label>
                    </Form.Floating>
                    <p className="mt-1 text-danger">{ errors?.password && <i className="mx-1 fa-solid fa-sm fa-circle-exclamation"></i> } { errors.password }</p>
                </Form.Group>
                
                <Button className='text-primary px-4 btn1' variant="light" onClick={() => props.changeAction('REGISTER')} >
                    Create account
                </Button>
                <Button className='px-4 btn1' style={{ float: 'right'}} variant="dark" type="submit"  disabled={loading}>
                    {loading ? 'loading...' : 'Log In'}
                </Button>
            </Form>
        </Col>
        </Row>
    )
}
import { useState } from 'react'
import { Row, Col, Form, Button, Image } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client';
import toast from "react-hot-toast"; 

const REGISTER_USER = gql`
    mutation register($username: String! $email:String! $password: String! $confirmPassword: String!) {
        register(username: $username email: $email password: $password confirmPassword: $confirmPassword) {
            username createdAt
        }
    }
`;

export default function Register(props) {
    const [ values, setValues ] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [ errors, setErrors ] = useState({})

    const [ registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, res) {
            toast.success('Account registered successfully!', { duration: 4000 });
            props.changeAction('LOGIN')
        },
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        registerUser({ variables: values })
    }

    const handleChange = (event) => {
        let { name, value } = event.target
        setValues({ ...values, [name]: value })
        // setErrors(errors => ( { ...errors, [name]: null } ))
    };
    
    return (
        <Row className="justify-content-center mt-5">
        <Col xs={11} sm={8} md={8} lg={4}>
           
            <div className="image d-flex flex-column p-0 align-items-center"> 
                <Image src="https://img.icons8.com/color/50/000000/chat--v3.png" />
                <div className="name m-2">Register to chatQL</div>
            </div>

            <hr />
           
            <Form onSubmit={handleSubmit}>

                <Form.Group className="my-4 text">
                    <Form.Floating>
                        <Form.Control
                        type="text"
                        name="email"
                        placeholder='Email address'
                        autoComplete='off'
                        isInvalid={ errors?.email }
                        onChange={handleChange}
                        />
                        <label htmlFor="floatingInputCustom">Email address</label>
                    </Form.Floating>
                    <p className="mt-1 text-danger">{ errors?.email && <i className="mx-1 fa-solid fa-sm fa-circle-exclamation"></i> } { errors.email }</p>
                </Form.Group>

                <Form.Group className="mb-4 text">
                    <Form.Floating>
                        <Form.Control
                        type="text"
                        placeholder='Username'
                        name="username"
                        autoComplete='off'
                        isInvalid={ errors.username }
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

            
                <Form.Group className="mb-4 text">
                    <Form.Floating>
                        <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm password'
                        autoComplete='off'
                        isInvalid={ errors.confirmPassword }
                        onChange={handleChange}
                        />
                        <label htmlFor="floatingInputCustom">Confirm password</label>
                    </Form.Floating>
                    <p className="mt-1 text-danger">{ errors?.confirmPassword && <i className="mx-1 fa-solid fa-sm fa-circle-exclamation"></i> } { errors.confirmPassword }</p>
                </Form.Group>

                <Button className='text-primary px-4 btn1' variant="light" onClick={() => props.changeAction('LOGIN')} >
                    Log in instead
                </Button>
                <Button className='px-4 btn1' style={{ float: 'right'}} variant="dark" type="submit"  disabled={loading}>
                    {loading ? 'loading...' : 'Register'}
                </Button>

            </Form>
        </Col>
        </Row>
    )
}
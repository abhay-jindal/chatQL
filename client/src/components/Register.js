import { useState } from 'react'
import { Col, Form, Button, Image } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import toast from "react-hot-toast"; 
import style from '../utils/style/account.module.css';
import { REGISTER_USER}  from '../utils/ApolloService/Mutations'

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
        <Col xs={12} sm={9} md={6} lg={3}>
           
            <div className="image d-flex flex-column align-items-center"> 
                <Image src="https://res.cloudinary.com/chatql/image/upload/chat--v3_j7wurk.png" />
                <h1 className=" m-2">Register to chatQL</h1>
            </div>

            <hr />

            <Form className={style.InputText} onSubmit={handleSubmit}>
                <Form.Group className="mb-4 text">
                    <Form.Floating>
                        <Form.Control
                        type="text"
                        name="email"
                        placeholder='name@example.com'
                        autoComplete='off'
                        isInvalid={ errors?.email }
                        onBlur={handleChange}
                        />
                        <label htmlFor="email">name@example.com</label>
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
                        onBlur={handleChange}
                        />
                        <label htmlFor="username">Username</label>
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
                            onBlur={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                    </Form.Floating>
                </Form.Group>

                <Form.Group className="mb-4 text">
                    <Form.Floating>
                        <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm password'
                        autoComplete='off'
                        isInvalid={ errors.confirmPassword }
                        onBlur={handleChange}
                        />
                        <label htmlFor="confirmPassword">Confirm password</label>
                    </Form.Floating>
                    <p className="mt-1 text-danger">{ errors?.confirmPassword && <i className="mx-1 fa-solid fa-sm fa-circle-exclamation"></i> } { errors.confirmPassword }</p>
                </Form.Group>

                <div className=' my-4' style={{  textAlign: 'center'}}>
                    <hr />
                    <div className='mb-1'>
                        <Image src="https://res.cloudinary.com/chatql/image/upload/privacy-icon_kdoel8.png" height={30}/>
                        </div>
                    <small > Your chatQL ID information is used to allow you to sign in securely and access your data.</small>
                    </div>
                <Button className='text-primary px-3' variant="light" onClick={() => props.changeAction('LOGIN')} >
                    Log in instead
                </Button>
                <Button className='px-4' style={{ float: 'right'}} variant="dark" type="submit"  disabled={loading}>
                    {loading ? 'loading...' : 'Register'}
                </Button>

            </Form>
        </Col>
    )
}
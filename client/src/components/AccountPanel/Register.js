import { useMemo, useState } from 'react'
import { Button, Col, Container, Form, Image, InputGroup } from 'react-bootstrap'
import { useAuthState } from '../../context/auth'
import Picker from 'emoji-picker-react';



export default function Register() {
    const user = useAuthState()
    const [ avatar, setAvatar ] = useState(user.user.imageURL)

    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [show, setShow] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    const handleBlurEvent = (e) => {
        const val = e.target.value
        if (!val) {
            setAvatar(user.user.imageURL)
            return
        }
        const avatarURI = `https://api.multiavatar.com/${val}.png?apikey=k5hVYGRQqBWfut`
        setAvatar(avatarURI)
    }

    const picker = useMemo(() => {
        if (show) {
            return <Picker
                        groupVisibility={{
                            animals_nature: false,
                            recently_used: false,
                            food_drink: false,
                        }}
                        disableSkinTonePicker
                        onEmojiClick={onEmojiClick}
                    />
        }
    }, [show])

    return (
        <Col xs={12} md={8} className="justify-content-center pb-5">
            <Container className="col-md-10">
            <Col md={12} xs={12} className="justify-content-center my-3 ">
                <div className="image d-flex flex-column p-0 align-items-center"> 
                
                    <Image roundedCircle src={avatar} height="120" width="120" />
                    <div className="text m-2">Hey there! I am using chatQL.</div>
                </div>
            </Col>

            <hr />

            <Form >
                <Form.Group className="mb-2">
                    <Form.Floating>
                        <Form.Control
                            type="text"
                            placeholder='Email address'
                            value={user.user.email}
                            readOnly
                            name="email"
                        />
                        <label htmlFor="floatingInputCustom">Email address</label>
                    </Form.Floating>
                </Form.Group>
                   
                <Form.Group className="mt-3 text">
                    <Form.Floating>
                        <Form.Control
                            type="text"
                            placeholder='Username'
                            // onChange={handleChange}
                            // isInvalid={ errors.email }
                            defaultValue={user.user.username}
                            name="email"
                        />
                        <label htmlFor="floatingInputCustom">Username</label>
                    </Form.Floating>
                    {/* <small className="text-danger">{ errors.email }</small> */}
                </Form.Group>

                <Form.Group className="mt-3 text">
                    <Form.Floating>
                        <Form.Control
                            type="text"
                            placeholder='Update avatar'
                            onBlur={handleBlurEvent}
                            name="avatar"
                        />
                        <label htmlFor="floatingInputCustom">Update avatar</label>
                    </Form.Floating>
                    <Form.Text className='mx-1'>
                    To create a new avatar, type anything in above field.
                    </Form.Text>
                </Form.Group>

                <InputGroup className="mt-3 text">
                    <Button size='lg' variant="outline-secondary" onClick={() => setShow(!show)}>
                   
                        <p>{ chosenEmoji ? chosenEmoji.emoji : <i className="fa-regular fa-face-smile"></i> }</p>
                       
                        <div style={{ position: 'absolute' }} >
                            {show &&  
                                <div style={{ position: 'absolute', bottom: '20px' }}>
                                    {picker}
                                </div>
                            }

                        </div>
                    </Button>
                  
                    <Form.Control
                        type="text"
                        placeholder='Update status'
                        name="status"
                    />   
                </InputGroup>

                <Button variant='dark' style={{ float: 'right'}} className="btn1 mt-4">Update Profile</Button>
            </Form>
        </Container>
        
    </Col>
    )
}
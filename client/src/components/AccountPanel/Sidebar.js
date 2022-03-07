import { Col, Image } from 'react-bootstrap'
import { useAuthState } from '../../context/auth';
import { Fragment, useCallback } from 'react';


const configOptions = [
    {
        label: 'Account',
        icon: <i className="fa-solid fa-lg mx-3 fa-user"></i>
    },
    {
        label: 'Notifications',
        icon: <i className="fa-solid fa-lg mx-3 fa-bell"></i>
    },
    {
        label: 'Upcoming events',
        icon: <i className="fa-solid fa-lg mx-3 fa-calendar"></i>
    },
    {
        label: 'Organize event',
        icon: <i className="fa-solid mx-3 fa-lg fa-calendar-plus"></i>
    },
    {
        label: 'Host an space',
        icon:  <i className="fa-solid fa-lg mx-3 fa-user-group"></i>
    },
    {
        label: 'Settings',
        icon: <i className="fa-solid fa-lg mx-3 fa-gear"></i>
    }
   
]


export default function Configuration() {
    const user = useAuthState()

    const usersMarkup = useCallback(configOptions.flatMap((option) => {
        return (
                
            <div className="d-flex p-2" key={option.label}> 
                <div className='d-flex mx-2 my-2 '>
                    <p className="text-muted">{ option.icon } <span >{ option.label }</span> </p>
                </div>
            </div>
        )
    }), [configOptions])
    

    return (
        <Fragment>

            <Col xs={12} md={3}  style={{ background: "linear-gradient(to right, rgb(236, 233, 230), rgb(255, 255, 255))" }} className="users-box p-0 flex-wrap d-md-block d-flex">
                <Col md={12} xs={12} className="justify-content-center my-3 ">
                    <div className="image d-flex flex-column p-0 align-items-center"> 
                        
                            <Image  src={user.user.imageURL} height="80" width="80" />
                       
                        <span className="name mt-2">@{user.user.username}</span>
                        <div className="text m-2"> Hey there! I am using chatQL.</div>
           
            <div className=" d-flex mt-2"> <button className="btn1 btn-dark">Edit Profile</button> </div>
           
        </div>
                </Col>
                <hr />
                <div className='user-markup d-md-block d-flex'>{usersMarkup}</div>
                <div className='mt-5'>

                    <hr />
                    <p style={{ fontSize: '12px'}} className='text-muted m-2 d-none d-md-block'>© 2022 chatQL LLC</p>
                </div>
            </Col>          
        </Fragment>
    )
}
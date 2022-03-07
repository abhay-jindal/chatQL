
import { useAuthState } from "../../context/auth"
import classNames from "classnames"

import moment from "moment"


export default function Message({ message }) {

    const { user } = useAuthState()
    const sent = message.from === user.username
    const received = !sent

    return (
            <div className={classNames('d-flex my-1', {
                'justify-content-end': sent,
                'justify-content-start': received,
            })}>
                <div style={{ backgroundColor: '#f2f2f0'}} className={classNames('py-2 px-3', 'rounded', {
                        'bg-secondary': sent
                    })}
                >
                    <small className="text-dark">{message.content}</small>
                   <p style={{ fontSize:'10px'}} className="text-muted">
                       
                       {moment(message.createdAt).format('MMM DD, YYYY @ h:mm a')}
                       </p>

                </div>
            </div>
    )
}
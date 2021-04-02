import React, {Fragment} from 'react';
import {Card} from "react-bootstrap";
import SmallSpinner from "../SmallSpinner";
import {Link} from "react-router-dom";

const UserInfoCard = ({users}) => {
    return (
        <Card
            bg={'info'}
            text={'white'}
            style={{width: '18rem'}}
            className="mb-2"
        >
            <Card.Header>Users</Card.Header>
            <Card.Body>
                <Card.Text>
                    {users ?
                        <Fragment>
                            Total no of users: {users}
                            <Link to={'/'} className={'text-white'}>Go to homepage</Link>
                        </Fragment>
                        :
                        <SmallSpinner text={"Please wait fetching all products...."}/>
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default UserInfoCard;

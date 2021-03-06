import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './join.css'
const Join = () => {
    const [Name, setName] = useState('');
    const [Room, setRoom] = useState('');
    return (
        <div className="joinOuterContainer">
            <div className="joinInnnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className='joinInput' type='text' onChange={(e) => { setName(e.target.value) }} /></div>
                <div><input placeholder="Room" className='joinInput mt-20' type='text' onChange={(e) => { setRoom(e.target.value) }} /></div>
                <Link onClick={e=>(!Name.length||!Room)?e.preventDefault():null} to={`/chat?name=${Name}&room=${Room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;
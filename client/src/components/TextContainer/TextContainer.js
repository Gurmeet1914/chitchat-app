import React from 'react';
import onlineIcon from '../../Icons/onlineIcon.png';
import './TextContainer.css';

const TextContainer =({users})=>(
    <div className="textContainer">
        <div>
            <h1>ChitChat App <span role="img" aria-label="emoji">💬</span></h1>
            <h2>Lets start a Talk with our family and friends<span role="img" aria-label="emoji">❤️</span></h2>
            <h2>Try it out right now!<span role="img" aria-label="emoji">⬅️</span></h2>
        </div>
        {
            users 
            ?(
                <div>
                    <h1> Users <span role="img" aria-label="emoji">👥</span></h1>
                    <div className="activeContainer">
                        <h2>
                            {
                                users.map(({name})=>(
                                    <div key ={name} className="activeItem" >
                                        <img  src={onlineIcon} alt="Online Icon"/>   {name}
                                    </div>
                                ))
                            }
                        </h2>
                    </div>
                </div>
            )
            :null
        }
    </div>

)
export default TextContainer;

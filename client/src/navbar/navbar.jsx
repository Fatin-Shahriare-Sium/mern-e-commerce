import React from 'react'
import './navbar.css'
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbar-brand">
                <p>Shawon Mill</p>
            </div>
            <div>
                <p style={{fontSize:'3rem',fontWeight:'bold'}}>Allah is Almighty</p>
            </div>
            <div  className="navbar-link">
                <a href="/" >Website</a>
            </div>

        </div>
    )
}

export default Navbar;

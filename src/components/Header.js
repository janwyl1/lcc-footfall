import React from 'react'
// import lccLogo from '../img/lcc-logo.jpg'
import lccLogoWhite from '../img/lcc-logo-white-01.svg'
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
    <div className="header">
            <NavLink to="/" aria-label="Home" className="logo"><img src={lccLogoWhite} alt="Leeds City Council Logo" /></NavLink>
            <nav>
                <ul>
                    <li><NavLink to="/" aria-label="Home" activeClassName="active" exact>Home</NavLink></li>
                    <li><NavLink to="/map" aria-label="Map" activeClassName="active" exact>Map</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;
import React from 'react'
// import lccLogo from '../img/lcc-logo.jpg'
import lccLogoWhite from '../img/lcc-logo-white-01.svg'

const Header = () => {
    return (
    <div style={{padding: "10px", background: "#007298", color: 'white', display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <img src={lccLogoWhite} alt="Leeds County Council" />
        <h1 style={{marginRight: "20px"}}>Leeds Footfall Counter</h1>
    </div>
    )
}

export default Header;
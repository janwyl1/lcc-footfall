import React from 'react'
import lccLogo from '../img/lcc-logo.jpg'

const Header = () => {
    return (
    <div>
        <img src={lccLogo} alt="Leeds County Council" style={{maxHeight: "10vh", padding: "5px"}}/>
    </div>
    )
}

export default Header;
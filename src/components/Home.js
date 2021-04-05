import React from 'react'
import arrow from '../img/arrow-1.svg'

const Home = () => {
    return (
    <div className="container-home">
        <div className="col-left">
            <div className="col-left-inner">
            <h2>Leeds City Council</h2>
            <h1>Footfall Counter</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et eros sollicitudin, facilisis justo id, scelerisque neque. Suspendisse interdum ipsuhm et blandit semper.</p>
            <p>Curabitur vel ligula convallis, feugiat neque non, ornare tellus. Pellentesque habitant morbi tristique senectus.</p>
            <p>Created by <a className="body-link" href="https://parall.ax">Parallax</a></p>
            <div><a className="blue-btn" href="/map" >View Footfall <img src={arrow} className="arrow" alt="" /></a></div>
            </div>
        </div>
        <div className="col-right">
           
        </div>
    </div>
    )
}

export default Home;
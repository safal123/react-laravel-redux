import React, {useState} from 'react';
import {Link} from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import {IconContext} from 'react-icons';
import './Admin.css';
import {GrClose} from "react-icons/all";

const Admin = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <IconContext.Provider value={{color: 'black'}}>
                <div className='admin-nav'>
                    <Link to='#' className=''>
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading bg-info d-flex justify-content-between align-items-center" onClick={showSidebar}>
                            <GrClose/> CLOSE
                        </div>
                        <div className="list-group list-group-flush">
                            <Link to="/admin"
                                  className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                            <Link to="/products/new" className="list-group-item list-group-item-action bg-light">Add new
                                product</Link>
                        </div>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Admin;

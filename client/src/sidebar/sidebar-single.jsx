import React from 'react'
import { Link } from 'react-router-dom';
import './sidebar-single.css'

const SidebarSingle = ({icon,name,cValue,handleClick,href}) => {
    return (
        <Link to={href}>
        <div onClick={()=>handleClick()} className={cValue==name?'sidebar-single clicked':'sidebar-single'}>
            <div className="sidebar-single--btn-icon">
                <img style={{width:'27px'}} src={icon} alt="" />
            </div>
            <div className="sidebar-single--btn-name">
                <p>{name}</p>
            </div>
        </div>
        </Link>
    )
}

export default SidebarSingle;

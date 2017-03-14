import React from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';
import './NavLink.less';

export default ({ type, to, name, isCollapsed }) => {
    name = isCollapsed ? '' : name;
    return (
        <li className='nav-link'>
            <Link to={to} activeClassName='active'>
                <Icon type={type} style={{
                    transition: 'all .3s',
                    fontSize: isCollapsed ? '18px' : null
                }} />{name}
            </Link>
        </li>
    );
};

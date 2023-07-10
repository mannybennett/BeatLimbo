import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton';

const Navigation = (props) => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: "1" }}>
                    Beat Limbo
                </Typography>
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Link to="/limbo">Limbo</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link to="/upload">Upload</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link to="/">Landing</Link>
                    </li>
                    {props.user && 
                    <li className="nav-list-item">
                        <LogoutButton />
                    </li>}
                    <li className="nav-list-item">
                    <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation;
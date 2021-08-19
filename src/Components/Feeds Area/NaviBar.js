import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/NaviBar.css'
import logo from '../Images/logo.png'
import wordLogo from '../Images/word_logo.png'
import { AuthContext } from '../../Context/AuthProvider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    kebab: {
        cursor: 'pointer'
    }
}))

function NaviBar() {
    const [optionBox, setOptionBox] = useState(false);
    const { logout } = useContext(AuthContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='navImage'>
            <div className="side1">
                <div className='navName'>
                    <img src={wordLogo} />
                </div>
                <div className='logo'>
                    <img src={logo} />
                </div>
            </div>

            {(
                <div className='side2'>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { logout() }}>Logout</MenuItem>
                    </Menu>
                </div>
            )}
        </div>
    )
}

export default NaviBar

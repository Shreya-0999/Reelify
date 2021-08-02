import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './SignUp.css'
import Logo from './instaLogo.png'
import mainImage from './mainImage.gif'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    textField: {
        // color:red
    },
    resize: {
        // fontSize: 10
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: "700",
        color: "#4e4a4a"
    },
    uploadBtn: {
        // width: 300
    },
    btn: {
        background: '#F83E65',
        width: 150,
        height: 50,
        // fontFamily: 'Quicksand, sans-serif'
    }
}));

function Login() {
    console.log("login Start");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();
    const [values, setValues] = React.useState({
        showPassword: false
    });

    const classes = useStyles();
    const { login, currentUser } = useContext(AuthContext);

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res = await login(email, password);
            console.log(res.user);
            setLoading(false);
            history.push('/');
            console.log("user logged in");
        }
        catch (e) {
            setError(e.message);
            setTimeout(() => setError(''), 2000)
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(currentUser){
            history.push('/');
        }
    },[]);

    return (
        <div className='body'>
            <div className='main_card'>
                <div className='card_1'>
                    <img src={mainImage} alt='' className='logImage'></img>
                </div>

                <div className='card_2'>
                    <div className='insta_logo'>
                        <img src={Logo} alt='Logo'></img>
                    </div>
                    <form onSubmit={handleLogin} className='user_data'>
                        <h4>Login</h4>
                        <div className='inputfield'>
                            <TextField
                                // className={classes.inputfield}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                // size='small'
                                fullWidth
                                color='secondary'
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                    // startAdornment: (
                                    //     <InputAdornment position="start">
                                    //       <AccountCircle />
                                    //     </InputAdornment>
                                    // ),
                                }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className='inputfield'>
                            <FormControl variant="outlined" fullWidth color = 'secondary'>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                        </div>

                        <div className='buttons'>
                            <Button
                                className={classes.btn}
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                type='submit'
                                color='secondary'
                            >
                                Login
                            </Button>
                            {error ? <h1>{error}</h1> : <></>}
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login

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
import '../Styles/SignUp.css'
import wordLogo from '../Images/word_logo.png'
import logo from '../Images/logo.png'
import mainImage from '../Images/login.png'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    textField: {
        borderColor: 'grey'
    },
    resize: {
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: "700",
        color: "#4e4a4a"
    },
    uploadBtn: {
        width: 290,
        borderRadius: '32px',
        color: '#6e666e',
    },
    btn: {
        background: 'linear-gradient(to bottom, #a06ded 5%, #845ce0 100%)',
        width: '100%',
        height: 50,
        borderRadius: '32px',
        boxShadow: '0px 10px 14px -7px #ab75d9',
        backgroundColor: '#a06ded',
        color: '#ffffff'
    }
}));

function Login() {
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
            setLoading(false);
            history.push('/');
        }
        catch (e) {
            setError(e.message);
            setTimeout(() => setError(''), 2000)
            setLoading(false);
        }
    }

    const handleRouting = () => {
        history.push('/signup');
    }

    useEffect(() => {
        if (currentUser) {
            history.push('/');
        }
    }, []);

    return (
        <div className='body'>
            <div className="glass">
                <div className='main_card'>
                    <div className='card_1'>
                        <img src={mainImage} alt='' className='logImage'></img>
                    </div>

                    <div className='card_2'>
                        <div className='reelify_logo'>
                            <img src={wordLogo} alt='Logo'></img>
                            <div className="signupLogo">
                                <img src={logo} alt='Logo' ></img>
                            </div>

                        </div>
                        <form onSubmit={handleLogin} className='user_data'>
                            <h4 className='subHeaderLogin'>Login</h4>
                            <div className='inputfield'>
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    color='primary'
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className='inputfield'>
                                <FormControl variant="outlined" fullWidth color='primary'>
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
                            </div>
                            {error ? <h4 className='loginError'>{error}</h4> : <></>}
                            <div className='card_3' >
                                <h5 onClick={handleRouting} className='routing' >New Member?  SignUp</h5>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Login

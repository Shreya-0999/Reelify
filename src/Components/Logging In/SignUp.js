import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthProvider';
import { storage, database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import wordLogo from '../Images/word_logo.png'
import logo from '../Images/logo.png'
import '../Styles/SignUp.css'
import mainImage from '../Images/signup.png'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    resize: {
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: "700",
        color: "#4e4a4a"
    },
    uploadBtn: {
        width: 290,
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

function SignUp() {

    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();
    const [values, setValues] = useState({
        showPassword: false
    });

    const { signUp, currentUser } = useContext(AuthContext);

    const handleProfilePicSubmit = (e) => {
        let file = e.target.files[0];
        if (file) {
            setProfilePic(file);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res = await signUp(email, password);
            let uid = res.user.uid;

            // storing profile image
            const uploadTaskListener = storage.ref(`/users/${uid}/Profile Picture`).put(profilePic);
            uploadTaskListener.on('state-changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => { setError('') }, 3000);
                setLoading(false);
            }

            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                
                await database.users.doc(uid).set({
                    Username: userName,
                    Full_Name: fullName,
                    Uid: uid,
                    Email: email,
                    ProfileUrl: downloadUrl,
                    Posts: [],
                    Bio: 'Add Bio',
                    Created_At: database.getCurrentTimeStamp()
                })
                setLoading(false);
                history.push('/');
            }
        }
        catch (e) {
            setError(e.message);
            setTimeout(() => { setError('') }, 3000);
            setLoading(false);
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRouting = () => {
        history.push('/login');
    }

    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, []);


    return (
        <div className='body'>
            <div className="glass">
                <div className='main_card'>
                    <div className='card_4'>
                        <div className='reelify_logo'>
                            <img src={wordLogo} alt='Logo'></img>
                            <div className="signupLogo">
                                <img src={logo} alt='Logo' ></img>
                            </div>

                        </div>

                        <form onSubmit={handleSignUp} className='user_data'>
                            <h4 className='subHeaderLogin'>Sign up</h4>
                            <div className='inputfield'>
                                <TextField
                                    id="outlined-basic"
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    color='primary'
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className='inputfield'>
                                <TextField
                                    id="outlined-basic"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    color='primary'
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
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
                                <FormControl variant="outlined" color='primary' fullWidth>
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
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleProfilePicSubmit}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        className={classes.uploadBtn}
                                        variant="outlined"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                        size='large'
                                    >
                                        Profile Picture
                                    </Button>
                                </label>
                            </div>
                            <div className='buttons'>
                                <Button

                                    className={`${classes.btn} logBtn`}
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    type='submit'
                                >
                                    Sign Up
                                </Button>
                            </div>
                            {error ? <h4 className='loginError'>{error}</h4> : <></>}
                            <div className='card_3' style={{ justifyContent: 'flex-start' }}>
                                <h5 onClick={handleRouting} className='routing'>Already a Member?  Login</h5>
                            </div>
                        </form>
                    </div>

                    <div className='card_1'>
                        <img src={mainImage} alt='' className='logImage'></img>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp

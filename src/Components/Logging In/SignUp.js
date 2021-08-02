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
import './SignUp.css'
import Logo from './instaLogo.png'
import mainImage from './mainImage.gif'
import { useHistory } from 'react-router-dom';


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

function SignUp() {
    console.log("Sign Up Start");

    const classes = useStyles();
    const [userName, setUserName] = useState('');
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
        console.log("Profile Selected");
    }

    const handleSignUp = async (e) => {
        console.log("hi")
        e.preventDefault();
        setLoading(true);
        try {
            let res = await signUp(email, password);
            let uid = res.user.uid;
            console.log(uid);

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
                console.log("profile picture url: ", downloadUrl);
                await database.users.doc(uid).set({
                    Username: userName,
                    Uid: uid,
                    Email: email,
                    ProfileUrl: downloadUrl,
                    Posts: [],
                    Created_At: database.getCurrentTimeStamp()
                })
                setLoading(false);
                history.push('/');
                console.log(('User has Signed in '));
            }
        }
        catch (e) {
            console.log(e)
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

    useEffect(()=>{
        console.log("UseEffect of Signup");
        if(currentUser){
            history.push('/')
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
                    <form onSubmit={handleSignUp} className='user_data'>
                        <h4>Sign up</h4>
                        <div className='inputfield'>
                            <TextField
                                className={classes.textField}
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                // size='normal'
                                fullWidth
                                color='secondary'
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
                            <FormControl variant="outlined" color = 'secondary' fullWidth>
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
                        {/* <div className='inputfield'>
                            <TextField
                                // className={classes.inputfield}
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                // size='small'
                                fullWidth
                                color='secondary'
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div> */}

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
                                    color="secondary"
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

                                className={classes.btn}
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                type='submit'
                                color='secondary'
                            >
                                Sign Up
                            </Button>
                            {error ? <h1>{error}</h1> : <></>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp

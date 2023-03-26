import React, { useEffect } from 'react';
import { Typography, FormControl, InputLabel, InputAdornment, IconButton, Input, Button, FormHelperText, ListSubheader, TextField, OutlinedInput, Select, Grid, Checkbox, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import SearchIcon from "@mui/icons-material/Search";
import {useHistory} from 'react-router-dom'
// import LoadingSpinner from '../../Common/LoadingSpinner/LoadingSpinner';
import {useRef} from "react"
import axios from 'axios';
const SignUp = () => {
    const history=useHistory();
    const[search,setSearch]=React.useState('')
    const[center,setCenter]=React.useState([])
    const[locationText,setLocationText]=React.useState('')
    const[privacyAlert,setPrivacyAlert]=React.useState('')
      const[placeData,setPlaceData]=React.useState([])
        const[error,setError]=React.useState('')
        const[loading,setIsLoading]=React.useState(false)
        const [user,setUser]=React.useState('')
    const [values, setValues] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        student:'',
        showPassword: false,
          phone: '',
    location: '',
    school: '',
    student: false,
    longitude: '',
    latitude: '',
    });
    const [checked, setChecked] = React.useState(false);
    const [studentChecker, setStudentChecker] = React.useState(false);
    
   const handleChecked = (event) => {
    setChecked(event.target.checked);
  };
//    const handleCheckedStudent = (event) => {
//     setStudentChecker(event.target.checked);
//   };
    const locationRef=useRef();
    React.useEffect(()=>{

        const fetchLocation= async ()=>{
        try{
          
        const {data}=await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=ke,ug&types=poi,address,neighborhood,locality,place,district,postcode&limit=100&access_token=${import.meta.env.VITE_APP_MAPBOX_TOKEN}`)
        const {features}=data
        setPlaceData(features)// an array
        
        
        }
        catch(error){
        console.error(error)
        return;
        }
                
        }
        fetchLocation()
        },[search])
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { name, email, password, confirmPassword } = values;
        let err;
        // let err;
      
        email === '' ? err = "Email is required" :
            !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) ?
                err = "Enter a valid email" :
                password !== confirmPassword ? err = "Password didn't matched" :
                !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/).test(password) ?
                        err = "passwords should be a mixture of numbers, letters and atleast a special character. It should also be a minimum of 8 characters" :
                        name === '' ? err = "Name is required" : err && setError(err);
                            // signUp(name, email, password);
           setIsLoading(true);
    try {
      const response = await axios.post('/api/register', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      await history.push('/');
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
        


    return (
        <div className="signUp-container">
            <div className="form-container">
                <Typography variant="h4" sx={{textAlign:'center'}} >
                    <Typewriter
                        options={{ loop: true }}
                        onInit={(typewriter) => {
                            typewriter.typeString('Create an account')
                                .pauseFor(2500).deleteAll()
                                .typeString('Sign up').pauseFor(2500)
                                .deleteAll()
                                .typeString('Register New Account')
                                .pauseFor(2500)
                                .start();
                        }}
                    />
                </Typography>
                <form onSubmit={handleSubmit} style={{ margin: '20px 0 0' }}>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-name">Name</InputLabel>
                        <Input
                            id="signUp-name"
                            type='text'
                            defaultValue={values.name}
                            required
                            onChange={handleChange('name')} />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-email">Email</InputLabel>
                        <Input
                            id="signUp-email"
                            type='email'
                            defaultValue={values.email}
                            required
                            onChange={handleChange('email')} />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-passwordField">Password</InputLabel>
                        <Input
                            id="signUp-passwordField"
                            type={values.showPassword ? 'text' : 'password'}
                            defaultValue={values.password}
                            required
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-passwordField">Confirm Password</InputLabel>
                        <Input
                            id="signUp-passwordField2"
                            type={values.showPassword ? 'text' : 'password'}
                            defaultValue={values.confirmPassword}
                            required
                            onChange={handleChange('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-name">phone</InputLabel>
                        <Input
                            id="phone"
                            type='text'
                            defaultValue={values.phone}
                            required
                            onChange={handleChange('phone')} 
                            autoComplete="Enter your mobile number"
                            />
                    </FormControl>
                    <Grid item xs={12} sx={{ m: 1 }}>
                Are you a Student?
                  <Checkbox
        checked={values.student}
        
       
      onChange={(event)=>{
        setValues({...values, student: event.target.value})
      }}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
              </Grid>
              {values.student &&
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-School">School</InputLabel>
                        <Input
                            id="School"
                            type='text'
                            defaultValue={values.school}
                            required
                            onChange={handleChange('school')} 
                            autoComplete="Enter your School"
                            />
                    </FormControl>
}
                    <Grid item xs={12} sx={{m: 1 }}>
<InputLabel id="demo-multiple-name-label">location</InputLabel>
        <Select
        sx={{width:'100%'}}
         MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select"
          value={locationText}
          label="Search location"
         
     
         
          input={<OutlinedInput label="Location" />}
          onChange={(event)=>{
            locationRef.current.value=event.target.value[0]
            setLocationText(event.target.value[0])
          
  console.log( event.target.value[1])
            setCenter(event.target.value[1])
          }}
          onClose={()=>{
            setSearch('')
          }}
               renderValue={() => locationText}
        >
            <ListSubheader>
           <TextField
           size="small"
              // Autofocus on textfield
              autoFocus

                  required
                  fullWidth
                  name="location"
                  label="Search Location"
                  type="text"
                  id="location"
                  placeholder={locationText}

                   inputRef={locationRef}
             autoComplete={locationText}
             InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
             onChange={ (e)=>{
setSearch(e.target.value)
             }}
             onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
                />
                </ListSubheader>
          {placeData.map(({id,center,place_name,geometry}) => (
            <MenuItem
              key={center}
              value={[place_name,center]}
              
            >
              {place_name}
            </MenuItem>
          ))}
        </Select>
             </Grid>
             <Grid item xs={12}>
                Before you signup, confirm that you have read, understood and agreed with our <a href="/terms"> Terms and conditions </a> 
                And our <a href="/privacy">Privacy policy</a>
                  <Checkbox
        checked={checked}
      onChange={handleChecked}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
              </Grid>

                    <FormHelperText sx={{ color: 'red', mx: 1, textTransform: 'capitalize', height: '15px' }}>{error}</FormHelperText>

                    {/* <Box sx={{ height: '30px' }}>
                        {authLoading && <LoadingSpinner width="30px" height="30px" />}
                    </Box> */}

                    <Button variant="contained" size="large" color="primary"
                        type="submit"
                        sx={{ width: '100%', mt: 1.5, mb: 4 }}>Sign Up
                    </Button>
                </form>

                <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account? <NavLink to="/auth/login"
                            style={{ color: 'red' }}>Login</NavLink>
                    </Typography>
                </Box>
            </div>
        </div>
    );
};

export default SignUp;
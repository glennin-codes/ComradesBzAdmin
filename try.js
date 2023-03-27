import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import TextArea from '@mui/material/TextareaAutosize';
import {useRef} from "react"
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ListSubheader, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from "../others/useAuthContext"
import Checkbox from '@mui/material/Checkbox';
import {useHistory} from 'react-router-dom'
//import mapboxgl from  'mapbox-gl/dist/mapbox-gl.js'
import axios from 'axios'

import SearchIcon from "@mui/icons-material/Search";
const theme = createTheme();


export default function SignUp() {
const[search,setSearch]=React.useState('')
React.useEffect(()=>{

const fetchLocation= async ()=>{
try{
  
const {data}=await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=ke,ug&types=poi,address,neighborhood,locality,place,district,postcode&limit=10&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
const {features}=data
setPlaceData(features)// an array


}
catch(error){

return;
}
        
}
fetchLocation()
},[search])

  const history=useHistory();
 const [checked, setChecked] = React.useState(false);
   const handleChange = (event) => {
    setChecked(event.target.checked);
  };

const[center,setCenter]=React.useState([])
const[locationText,setLocationText]=React.useState('')
const[privacyAlert,setPrivacyAlert]=React.useState('')
  const[placeData,setPlaceData]=React.useState([])
    const[error,setError]=React.useState('')
    const[loading,setLoading]=React.useState(false)
    const [user,setUser]=React.useState('')
    const {signUp}=useAuth()

    const PHONE_REGEX= /^\+(?:[0-9] ?){6,14}[0-9]$/;

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const emailRef=useRef();
     const nameRef=useRef();
    const passwordRef=useRef();
      const locationRef=useRef();
        const mobileRef=useRef();
         const descriptionRef=useRef();
        const facebookRef=useRef();
          const twitterRef=useRef();
            const instagramRef=useRef();
    const passwordConfirmationRef=useRef();
 async  function handleSubmit(e){
        e.preventDefault()
const v1 = PHONE_REGEX.test(mobileRef.current.value);
        const v2 = PWD_REGEX.test(passwordRef.current.value);
        const v3 =EMAIL_REGEX.test(emailRef.current.value)
        if (!v1 ) {
            setError("Your mobile number should valid  include a country code ");
            return;
        }
        if (!v2 ) {
            setError("passwords should be a mixture of numbers, letters and atleast a special character. It should also be a minimum of 8 characters");
            return;
        }
        if (!v3 ) {
            setError("Invalid email adress");
            return;
        }

         if(passwordRef.current.value !== passwordConfirmationRef.current.value){
return setError(`passwords do not match`)
    }
    try{
        setError('')
        setLoading(true)
 await  signUp(emailRef.current.value,passwordRef.current.value)
 const {data}= await axios.post(`https://milesmotors.onrender.com/auth/register`,{
  email:emailRef.current.value,
password:passwordRef.current.value,
name:nameRef.current.value,
location:locationText,
mobile:mobileRef.current.value,
description:descriptionRef.current.value,
facebook:facebookRef.current.value,
twitter:twitterRef.current.value,
instagram:instagramRef.current.value,
longitude:center[0].toString(),
latitude:center[1].toString()




 })

setUser(`${JSON.stringify(data)}`)
 

 await
 history.push('/pay')
    }
    catch(error){
setError(`failed to create an account!${error}`)
    }
    setLoading(false)
      
    } 
   

  return (
    <ThemeProvider sx={{marginTop:'150px'}} theme={theme}>
      <Container sx={{marginTop:'150px'}} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop:'150px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
           {user && <Alert severity="success">{user}</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Name"
                  type="text"
                  id="name"
                   inputRef={nameRef}
                  autoComplete="Enter your name"
                />
              </Grid>
               

  <Grid item xs={12}>
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
            setLocationText(event.target.value[2])
          
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
                <TextField
                  required
                  fullWidth
                  name="Mobile"
                  label="Mobile"
                  type="text"
                  id="Mobile"
                   inputRef={mobileRef}
                  autoComplete="Enter your mobile number"
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  name="facebook"
                  label="facebook"
                  type="url"
                  id="facebook"
                   inputRef={facebookRef}
                  placeholder='facebook url'
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                 
                  fullWidth
                  name="twitter"
                  label="twitter"
                  type="url"
                  id="twitter"
                   inputRef={twitterRef}
                  placeholder='twitter  url'
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  name="instagram"
                  label="instagram"
                  type="url"
                  id="instagram"
                   inputRef={instagramRef}
                  placeholder='instagram url'
                />
              </Grid>
               <Grid item xs={12}>
                <TextArea
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  minRows={4}
                  maxRows={4}
                style={{ width: "100%" }}
                  placeholder="enter a brief description about your car dealership business"
                  ref={descriptionRef}
                  autoComplete="describe your company/business"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                   inputRef={passwordRef}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm_Password"
                  type="password"
                  id="password"
                   inputRef={passwordConfirmationRef}
                  autoComplete="confirm_password"
                />
              </Grid>
              <Grid item xs={12}>
                Before you signup, confirm that you have read, understood and  agreed with our <a href="/terms">Terms and conditions</a>
                And our <a href="/privacy">Privacy policy</a>
                  <Checkbox
        checked={checked}
      onChange={handleChange}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
              </Grid>
            
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{
                if(!checked){
return setPrivacyAlert('Please agree to the terms,conditions and the privacy policy ')
                }
                
              }}
              disabled={loading || !checked}
            >
              Sign Up
            </Button>
            {privacyAlert &&  <Alert severity="error">{privacyAlert}</Alert>}
           
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}
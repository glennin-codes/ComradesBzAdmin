import {  Grid  , TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import Alert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom";

export default function UpdateProductForm({product, onClose,setRefresh}) {
  const [name, setName] = useState(product.name);
  const [location, setLocation] = useState(product.location);
  const [school, setSchool] = useState(product.school);
  const [email, setEmail] = useState(product.email);
  const [phone, setPhone] = useState(product.phone);
  const [open, setOpen] = useState(false);
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");
  const navigate=useNavigate();
  console.log(product);
  console.log(product._id)

  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
    // Get token from local storage
    const token = localStorage.getItem('token')

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    const res = await axios.put(`https://comradesbizapi.azurewebsites.net/api/user/${product._id}`, {
        name,
        email,
        location,
        isVerified,
        createdAt,
        school,
        phone
      },
      config
      );
      if (res.status === 200) {
        setSuccess("Product updated successfully");
           setRefresh(prevState => !prevState)
        setOpen(false);
        onClose();
        
      }
     
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Product not found");
      
      } 
       else if ( error.response && error.response.status === 401) {
        setError('You are not authorized to access this resource.');
      }
       else if (error.response && error.response.status === 403) {
        setError('Access to this resource is forbidden. Please log in to continue.');
        setTimeout(()=>{
          navigate('/');
        }
        ,3000
        )
      }else if (error.response && error.response.status === 500){
          console.log(error.response.data);
         setError("Server error!");
      }
      else {
        setError("network error!,check your connections and try again");
       
      }
      setOpen(false);
    }
  };

  return (
    <div>
        {success && <Alert severity='success'>{success}</Alert>}
        {error && <Alert severity='error'>{error}</Alert>}
      <Button onClick={() => setOpen(true)}>Update Product</Button>
    
      <Box maxWidth="sm" sx={{ my: 4, mx: "auto" }}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent >

      
        <Grid  item  xs={6} md={4}>
        <Box sx={{ display: "flex", alignitems: "flex-end" }}>
            <TextField variant='standard' fullWidth  label="Name" value={name} onChange={(event) => setName(event.target.value)} />
           </Box>
              </Grid>
              <Grid  item xs={6} md={4}>
              <Box sx={{ display: "flex", alignitems: "flex-end" }}>
              <TextField label="location" fullWidth variant='standard' value={location} onChange={(event) => setLocation(event.target.value)} />
            </Box>
              </Grid>
              <Grid  item xs={6} md={4}>
              <Box sx={{ display: "flex", alignitems: "flex-end" }}>
              <TextField label="Company" fullWidth variant='standard' value={school} onChange={(event) => setSchool(event.target.value)} />
              </Box>
              </Grid>
                
                <Grid  item xs={6} md={4}>
                <Box sx={{ display: "flex", alignitems: "flex-end" }}>
                <TextField label="email" fullWidth variant='standard' value={email} onChange={(event) => setEmail(event.target.value)} />
           
                </Box>
                </Grid>
                <Grid  item xs={6} md={4}>
                <Box sx={{ display: "flex", alignitems: "flex-end" }}>
                <TextField label="phone"  fullWidth variant='standard' value={phone} onChange={(event) => setPhone(event.target.value)} />
                </Box>
                </Grid>
            
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
          setOpen(false)
             setRefresh(prevState => !prevState);
             onClose()
          }
          }>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
        </Box>
    </div>
  );
}


import {  Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import Alert from "@mui/material/Alert"

export default function UpdateProductForm({ _id, onClose}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [open, setOpen] = useState(false);
  console.log(_id)

  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
    const res = await axios.patch(`https://shopifybackend.onrender.com/api/product/${_id}`, {
        name,
        category,
        compony,
        price,
        stock,
      });
      if (res.status === 200) {
        Alert("Product updated succesfull");

        setOpen(false);
        onClose();
        
      }
     
    } catch (error) {
      console.error(error);
      alert("There was an error");
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Update Product</Button>
      <Box maxWidth="sm" sx={{ my: 4, mx: "auto" }}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent >

      
        <Grid xs={6} md={4}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField variant='standard' fullWidth  label="Name" value={name} onChange={(event) => setName(event.target.value)} />
           </Box>
              </Grid>
              <Grid xs={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField label="Category" fullWidth variant='standard' value={category} onChange={(event) => setCategory(event.target.value)} />
            </Box>
              </Grid>
              <Grid xs={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField label="Compony" fullWidth variant='standard' value={company} onChange={(event) => setCompany(event.target.value)} />
              </Box>
              </Grid>
                
                <Grid xs={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField label="Price" fullWidth variant='standard' value={price} onChange={(event) => setPrice(event.target.value)} />
           
                </Box>
                </Grid>
                <Grid xs={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField label="Stock"  fullWidth variant='standard' value={stock} onChange={(event) => setStock(event.target.value)} />
                </Box>
                </Grid>
            
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
        </Box>
    </div>
  );
}

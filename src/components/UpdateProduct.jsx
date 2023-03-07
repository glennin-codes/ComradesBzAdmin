import { Alert, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";

export default function UpdateProductForm({ product, onClose }) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [compony, setCompony] = useState(product.compony);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://shopifybackend.onrender.com/api/product/${product._id}`, {
        name,
        category,
        compony,
        price,
        stock,
      });
      setOpen(false);
      onClose();
    } catch (error) {
      console.error(error);
      Alert("There was an error");
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Update Product</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent >
        <Grid xs={6} md={4}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField variant='standard' fullWidth  label="Name" value={name} onChange={(event) => setName(event.target.value)} />
           </Box>
              </Grid>
            <TextField label="Category" variant='standard' value={category} onChange={(event) => setCategory(event.target.value)} />
            <TextField label="Compony"variant='standard' value={compony} onChange={(event) => setCompony(event.target.value)} />
            <TextField label="Price" variant='standard' value={price} onChange={(event) => setPrice(event.target.value)} />
            <TextField label="Stock" variant='standard' value={stock} onChange={(event) => setStock(event.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect,useState} from 'react'
import axios from 'axios'
import  Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"





export default function Manageproducts() {

    const [products,setProducts]=useState([])
    const[success,setSuccess]=React.useState("")
    const [refresh, setRefresh] = useState(false);
    useEffect(()=>{
const fetchproducts= async ()=>{
const {data}=await axios.get("https://shopifybackend.onrender.com/api/products/all")
setProducts(data)
}
fetchproducts()
    },[refresh])
    const deleteProduct = async (_id) => {
      try {
        setSuccess("");
        alert(`Are you sure you want to delete product with ${_id} id? This action is irreversible!`);
        const res = await axios.delete(`https://shopifybackend.onrender.com/api/product/${_id}`);
        if (res.status === 200) {
          setSuccess("Product deleted successfully");
          setRefresh(prevState => !prevState);
          
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
          alert("Product not found");
        
        } else {
          alert("There was an error");
         
        }
      }
    };
    
  return (
    <TableContainer component={Paper}>
      {success && <Alert severity='success'>{success}</Alert>}
      <Table sx={{width:'100vw',maxWidth:'100vw' }} aria-label="simple table">
        <TableHead sx={{width:"100vw"}}>
          <TableRow >
            <TableCell sx={{width:"10vw"}}>Product Name</TableCell>
            <TableCell sx={{width:"15vw"}}>Image</TableCell>
            <TableCell sx={{width:"10vw"}} >Category</TableCell>
            <TableCell sx={{width:"10vw"}} >Compony</TableCell>
            <TableCell sx={{width:"10vw"}} >Stock</TableCell>
            <TableCell sx={{width:"10vw"}} >Price</TableCell>
           
           
     
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(({ name, _id, image, category, price,  color, compony,stock }) => (
            <TableRow
              key={_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  sx={{width:"10vw"}} component="th" scope="row">
                {name}
              </TableCell>
              <TableCell  sx={{width:"15vw"}} component="th" scope="row">
               <img src= {image} alt={''} style={{height:'100px',width:"100px"}}/>
              </TableCell>
              <TableCell  sx={{width:"10vw"}} >
                {category}
              
              </TableCell>
           
              <TableCell  sx={{width:"10vw"}} >
                {compony}
              
              </TableCell>
           
              <TableCell  sx={{width:"10vw"}} >
                {stock}
              
              </TableCell>
           
              <TableCell  sx={{width:"10vw"}} >
                {price}
              
              </TableCell>
           
              <TableCell  sx={{width:"10vw"}}  >
                <Typography component={Button}
                // disabled={currentUser?.email!=='milesmotorssocialmedia@gmail.com'}
                onClick={
                  ()=>deleteProduct(_id)
                }
                >Delete</Typography>
              </TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
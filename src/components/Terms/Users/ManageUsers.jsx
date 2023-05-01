import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import moment from "moment";
import { CircularProgress, Grid, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit, Verified} from '@mui/icons-material';
import UpdateUserForm from "./UpdateUsers";
import { ClipLoader } from "react-spinners";
import { css } from '@emotion/react';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const ManageUsers=()=>{
    const [selectedUser, setselectedUser] = useState(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [success, setSuccess] = React.useState("");
  const [refresh, setRefresh] = useState(false);
  const [open,setOpen]=useState(false);
  const[productFeatures,setProductFeatures]=useState([]);
  const [loading, setLoading] = useState(false);
  const [ productsLoading,setProductsLoading]=useState(false);
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    setLoading(true);
    const fetchUsersAndProductFeatures = async () => {
      try {
        const { data } = await axios.get(
          "https://comradesbizapi.azurewebsites.net/api/user"
        );
        setUsers(data);
        
        let promises = [];
  
        setProductsLoading(true);
  
        data.forEach((user) => {
          const promise = axios
            .get(`https://comradesbizapi.azurewebsites.net/api/user/products/${user.email}`)
            .then((response) => response.data)
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                return []; // return an empty array if 404 error occurs
              }
              throw error; // throw other errors
            });
          promises.push(promise);
        });
  
        Promise.all(promises)
          .then((results) => {
            const products = results.flat(); // flatten the array of arrays
            setProductFeatures(products);
            setProductsLoading(false);
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              console.log(error.response.data);
              setError("Server error!");
            } else {
              setError("Network error while trying to fetch! Check your connection and try again.");
            }
          });
          
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUsersAndProductFeatures();
  }, [refresh]);
  


  const handleEditClick = (userId) => {
    const user = users.find((p) => p._id === userId);
    setselectedUser(user);
    setOpen(true);
    
  };
  const deleteuser = async (_id) => {
    try {
      setSuccess("");
      alert(
        `Are you sure you want to delete user with ${_id} id? This action is irreversible!`
      );
      const token=localStorage.getItem('token'); // Get token from local storage
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.delete(
        `https://comradesbizapi.azurewebsites.net/api/user/${_id}`,
        config
      );
      if (res.status === 200) {
        setSuccess("user deleted successfully");
        setRefresh((prevState) => !prevState);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        alert("user not found");
      } else if (error.response.status === 401) {
        alert("You are not authorized to access this resource.");
      } else if (error.response.status === 403) {
        alert(
          "Access to this resource is forbidden. Please log in to continue."
        );
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (error.response.status === 500) {
        console.log(error.response.data);
        alert("Server error!");
      } else {
        alert("network error!,check your network and try again");
      }
    }
  };

return(
 
    <>
      
  
    {selectedUser && (
      <UpdateUserForm
        user={selectedUser}
        openner={open}
        onClose={() => {
          setselectedUser(null);
         
        }}
        setRefresh={setRefresh}
      />
    )}
 
 {loading ?(
       
       <ClipLoader
       color={"#36D7B7"}
       loading={loading}
       css={override}
       size={150}/>
     
   
    ):
    <TableContainer component={Paper}>
      {success && <Alert severity="success">{success}</Alert>}
     {error && <Alert severity="error">{error}</Alert>}
      <Table
        sx={{
          width: "100vw",
          maxWidth: "90vw",
          overflowX: "auto",
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
        aria-label="simple table"
      >
        <TableHead sx={{ width: "100vw" }}>
          <TableRow>
            <TableCell sx={{ width: "6vw" }}   component="th" scope="row" > Email</TableCell>
            <TableCell sx={{ width: "8vw" }}    component="th" scope="row" >Name</TableCell>
            <TableCell sx={{ width: "6vw" }}    component="th" scope="row" >Phone</TableCell>
            <TableCell sx={{ width: "6vw" }}    component="th" scope="row" >Location</TableCell>
            <TableCell sx={{ width: "6vw" }}    component="th" scope="row" >School</TableCell>
           

            <TableCell sx={{ width: "4vw" }}    component="th" scope="row" >Validated</TableCell>
            <TableCell sx={{ width: "4vw" }}    component="th" scope="row" >Number of Products</TableCell>
            <TableCell sx={{ width: "3vw" }}    component="th" scope="row" >Number of Used Products</TableCell>
            <TableCell sx={{ width: "3vw" }}    component="th" scope="row" >Number of New Products</TableCell>
            <TableCell sx={{ width: "3vw" }}    component="th" scope="row" >Number of featured Products</TableCell>

            <TableCell sx={{ width: "4vw" }}    component="th" scope="row" >Paid</TableCell>
            <TableCell sx={{ width: "8vw" }}    component="th" scope="row" >Time Registered</TableCell>
            <TableCell sx={{ width: "8vw" }}    component="th" scope="row" >Edit</TableCell>
            <TableCell sx={{ width: "8vw" }}    component="th" scope="row" >Delete</TableCell>
    
          </TableRow>
        </TableHead>
 
        <TableBody>
          {users.map((user) => {
            const {
              name,
              _id,    
        email,
        location,
        isVerified,
        school,
        phone,
        createdAt
            } = user;
          
         
            return (
              <TableRow
                key={_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ width: "8vw" }} component="td" scope="row">
                  {name}
                </TableCell>
            
                <TableCell sx={{ width: "6vw" }} component="td" scope="row" >{email}</TableCell>

                <TableCell sx={{ width: "6vw" }}  component="td" scope="row">{phone}</TableCell>

                <TableCell sx={{ width: "6vw" }} component="td" scope="row" >{location}</TableCell>

                <TableCell sx={{ width: "6vw" }} component="td" scope="row" >{school}</TableCell>
                <TableCell sx={{ width: "4vw" }} component="td" scope="row">{isVerified ? <Verified color="primary" /> : <Verified color="error" />}</TableCell>
                <TableCell sx={{ width: "3vw" }} component="td" scope="row" >{ productsLoading?<CircularProgress size={24} />:productFeatures.filter((product)=>product.user===email).length
                 }</TableCell>
                <TableCell sx={{ width: "3vw" }} component="td" scope="row" >{ productsLoading?<CircularProgress size={24} />:productFeatures.filter((product)=>product.user===email && product.secondHand === true).length
                 }</TableCell>
                <TableCell sx={{ width: "3vw" }} component="td" scope="row" >{ productsLoading?<CircularProgress size={24} />:productFeatures.filter((product)=>product.user===email && product.isClean === true).length
                 }</TableCell>
                <TableCell sx={{ width: "3vw" }} component="td" scope="row" >{ productsLoading?<CircularProgress size={24} />:productFeatures.filter((product) => product.user === email && product.featured === true).length

                 }</TableCell>
                <TableCell sx={{ width: "3vw" }} component="td" scope="row">0 KSH</TableCell>
                <TableCell sx={{ width: "8vw" }} component="td" scope="row" >{moment(createdAt).format("Do MMM YYYY, h:mm:ss a")}</TableCell>
                <TableCell>
                  <IconButton
                    // component={Button}
                    // aria-label="edit"
                    color="primary"
                    size="small"
                    
                    onClick={() => handleEditClick(user._id)
                    }
                  >
                    <Edit />
                  </IconButton>
                </TableCell>

                <TableCell sx={{ width: "8vw" }}>
                  <IconButton
                   
                    color="error"
                    // disabled={currentUser?.email!=='milesmotorssocialmedia@gmail.com'}
                    onClick={() => deleteuser(_id)}
                  >
                    <Delete/>
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

      </Table>
    </TableContainer>
}
    <Grid
      item
      xs={12}
      sx={{ textAlign: "right", color: "magenta", fontSize: "2.5rem" }}
    >
      <Typography component={Link} to="/manage"
      sx={{color: "magenta", fontSize: "1.5rem" }}
      >
        manage all products
      </Typography>
    </Grid>

  </>
)
}
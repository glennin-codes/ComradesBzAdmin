import {
  Button,
  Alert,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import React from "react";
import {useCallback,useEffect,useState} from 'react'
import { useDropzone } from "react-dropzone";
import Toast from "../assets/utils/Toast";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
{/*states*/}
const [values, setValues] = useState({});
const [images, setImages] = useState([]);
 const [status, setStatus] = React.useState("");
  const [failed, setFailed] = React.useState("");
  const [error, setError] = React.useState(""); 
const [uploading, setIsUpLoading] = useState();
const [isSubmit,setIsSubmit]=useState(false);
const [selected,setIsSelected]=useState(0);

const time = 1* 60 * 1000;//waiting time to upload
useEffect(()=>{
  if (isSubmit) {
    window.scrollTo(0, 0);
  }
  if (uploading) {
    toast.loading(uploading);
    setIsUpLoading();
  }
  
  if (status) {
    toast.dismiss();
    toast.success(status);
    setStatus();
  }
  if(error){
    toast.error(error)
  }
},[isSubmit,uploading,error,status])
const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
  let processedFiles = 0;
  const count=acceptedFiles.length ;
  setIsSelected(prevCount=> prevCount + count);
  console.log(selected);
  if (selected > 10) {
    toast.error("Cannot accept more than 10 files.");
    return;
  }

  const numberOfAcceptedFiles = Math.min(acceptedFiles.length, 10 - images.length);
  const EstablishedAcceptedFiles = acceptedFiles.slice(0, numberOfAcceptedFiles);


  EstablishedAcceptedFiles.forEach(file => {
    if (processedFiles >= 10) {
      toast.error("Only 10 files can be processed at a time.");
      return;
    }
    processedFiles++;
    if (!file.type.startsWith("image/jpeg") && !file.type.startsWith("image/png") && !file.type.startsWith("image/jpg")) {
      toast.error(`File ${file.name} has an unsupported format and cannot be processed.`);
      return;
    }
    if (file.size > 6.5 * 1024 * 1024) {
      toast.error(`File ${file.name} is larger than 6.5 MB and cannot be processed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const binaryStr = reader.result;
      setImages(prevState => [...prevState, binaryStr]);
    };
  });
}, [selected,images]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  const handleValueChange = (prop) =>(event)=> {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = () => {};
  return (
    <Box>
      <Toast time={time}/>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold">
        Add New product In Shop
      </Typography>

      <Box maxWidth="sm" sx={{ my: 4, mx: "auto" }}>
        {/* new car information form */}
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={3.5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              {/* product name */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  variant="standard"
                  required
                  type="text"
                  onChange={handleValueChange("name")}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              {/*category*/}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  fullWidth
                  label="Reviews"
                  variant="standard"
                  required
                  type="text"
                  onChange={handleValueChange("reviews")}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              {/* stock */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  fullWidth
                  label="Stock"
                  variant="standard"
                  required
                  type="text"
                  onChange={handleValueChange("stock")}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              {/* car body color */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  fullWidth
                  label="Ratings"
                  variant="standard"
                  required
                  type="text"
                  onChange={handleValueChange("stars")}
                 
                />
              </Box>
            </Grid>
            <Grid item xs={7} md={8}>
              {/* car transmission status */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  fullWidth
                  label="Category"
                  variant="standard"
                  required
                  text="text"
                  onChange={handleValueChange("category")}
                />
              </Box>
            </Grid>
            
            <Grid item xs={7} md={8}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  fullWidth
                  label="Price"
                  variant="standard"
                  required
                  type="number"
                  onChange={handleValueChange("price")}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}> */}
               <Box>
                <Paper
                  style={{
                    cursor: "pointer",
                    background: "white",
                    color: "#bdbdbd",
                    border: "1px dashed #ccc",
                    "&:hover": { border: "1px solid magenta" },
                  }}
                  elevation={7}
                >
                  <div
                    style={{ padding: "16px", alignItems:"center",textAlign:"center" }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p style={{ color: "green", fontWeight: "700" }}>
                        Drop the images here...
                      </p>
                    ) : (
                      <>
                        <p
                          style={{
                            marginBottom: "5px",
                            fontWeight: "700",
                            opacity: "none",
                          }}
                        >
                          Drag 'n' Drop some images here, or click to select
                          files
                        </p>
                        <em style={{ color: "#FFBF00", marginTop: "5px" }}>
                          Please select at least 5 images but a muximum of 10
                        </em>
                        <br />
                        <em sx={{ color:"magenta",marginTop: "5px", size:"18px" }}>
                          Ensure that each image does not exceed 6.5MB in size
                        </em>
                        <br />
                        <em style={{  }}>
                          (images with *.jpeg, *.png, *.jpg extension will be
                          accepted)
                        </em>
                       
                      </>
                    )}
                  </div>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {/* car description textarea */}
              <TextField
                fullWidth
                multiline
                rows={4}
                sx={{ my: 2 }}
                label="Description"
                variant="outlined"
                type="text"
                required
                onChange={handleValueChange("description")}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="outlined"
                >
      
                Add to Database
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

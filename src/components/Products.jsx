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

export default function Products() {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) =>{

  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  const handleValueChange = () => {};
  const handleSubmit = () => {};
  return (
    <Box>
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
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Paper
                  style={{
                    cursor: "pointer",
                    background: "white",
                    color: "#bdbdbd",
                    border: "1px dashed #ccc",
                    "&:hover": { border: "1px solid #ccc" },
                  }}
                  elevation={7}
                >
                  <div
                    style={{ padding: "16px", height: "200px" }}
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

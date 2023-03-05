import React, { forwardRef } from "react";
import { CSSTransition } from "react-transition-group"; 
import "../style/product.css"
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
  
  } from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete'
  import IconButton from '@mui/material/IconButton';
 

export default function ImgComponent({images,handleColorChange,deleteImage}) {
    const ImageTransition =forwardRef ((props, ref) => {
        
        return(  <CSSTransition
            nodeRef ={ref}
            {...props}
          />
        )
      });
    return (
    <>
        <Grid item xs={12}>
      {images.map((image, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "flex-end", mb: 2 }} className="image-wrapper">
          {/* image display */}
          <ImageTransition
            key={index}
           in={true}
            appear={true}
            timeout={500}
            classNames={{
              enter: "image-fade-enter",
              enterActive: "image-fade-enter-active",
              exit: "image-fade-exit",
              exitActive: "image-fade-exit-active",
            }}
            unmountOnExit
          >
            <img src={image.data} alt={`Image ${index + 1}`} width="100" height="100" ref={image.ref}/>
          </ImageTransition>
          {/* color input */}
          <FormControl fullWidth variant="standard">
            <InputLabel>Image {index + 1} Color</InputLabel>
            <Select value={image.color} onChange={handleColorChange(index)}>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="green">Black</MenuItem>
              <MenuItem value="green">white</MenuItem>
              <MenuItem value="green">pink</MenuItem>
              <MenuItem value="green">silver</MenuItem>
              <MenuItem value="green">yellow</MenuItem>
            </Select>
          </FormControl>
          <IconButton>
            <ImageTransition
              key={index}
              in={true}
              appear={true}
              timeout={500}
              classNames={{
                ent: "delete-fade-enter",
                enterActive: "delete-fade-enter-active",
                exit: "delete-fade-exit",
                exitActive: "delete-fade-exit-active",
              }}
              unmountOnExit
            >
              <DeleteIcon
                sx={{
                  color: "rgb(255, 0, 0)",
                  "&:hover": {
                    color: "rgb(200, 0, 0)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => deleteImage(index)}
              />
            </ImageTransition>
          </IconButton>
        </Box>
       
      ))}
       </Grid>
    </>
  );
}

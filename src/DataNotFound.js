import React from "react";
import Image from "./assets/data-not-found.jpg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import colors from "./Colors/Colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function DataNotFound() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.notFoundContainer}>
      <Box className={classes.backbtn} sx={{ boxShadow: 2 }} onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fontSize: 16 }} />
      </Box>
      <Box className={classes.imgaeContainer}>
        <Typography className={classes.content}>Data Not Found!</Typography>
      </Box>
    </Box>
  );
}

export default DataNotFound;

const useStyles = makeStyles({
  notFoundContainer: {
    width: "100%",
    height: "calc(100vh - 200px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  backbtn: {
    position: "absolute",
    top: 50,
    left: 50,
    backgroundColor: colors.boxColor,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  content: {
    position: "absolute",
    left: 50,
    top: 80,
    fontSize: 32,
    fontWeight: "800",
    color: colors.themeColor,
  },

  imgaeContainer: {
    position: "relative",
    width: 600,
    height: 500,
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    objectFit: "cover",
  },
});

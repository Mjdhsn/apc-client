import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";

//material ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import colors from "../Colors/Colors";

function LoadingScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const classes = useStyles();
  return (
    <Box className={classes.loadingContainer}>
      <Typography className={classes.loadingContent}>Please wait!</Typography>
      <Lottie options={defaultOptions} height={100} width={100} />
    </Box>
  );
}

export default LoadingScreen;

const useStyles = makeStyles({
  loadingContainer: {
    width: "calc(100vw)",
    height: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingContent: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.themeColor,
    marginBottom: 20,
  },
});

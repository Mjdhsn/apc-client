import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import Header from "../../compononts/header";
import css from "./login.module.scss";
import { toast } from "react-toastify";
import { USER_API } from "../../config";
import removeToken from '../../compononts/useToken'
import { toastOption } from "../../utils/toastOption";
import { authInit } from "../../config/state";
import { useAtom } from "jotai";
import Button from '../../compononts/Button'


const Login = (props) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState(false);
  const [auth, setAuth] = useAtom(authInit)

  var initValues = {
    username: "",
    password: "",
  }

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      username: Yup.string().max(255).min(4, "Minimum 4 characters required").required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      handleSubmit()
    },
  });

  function logMeIn() {
    axios({
      method: "POST",
      url: USER_API+"login",
      data:{
        username: formik.values.username,
        password: formik.values.password
      }
    })
    .then((response) => {

      setAuth(response.data.user)
      localStorage.setItem("access_token", response.data.access_token)
      localStorage.setItem("user", response.data.refresh_token)
      localStorage.setItem("loged", "web-loged")

    }).catch((error) => {
      if (error.response.data) {
        toast.error(error.response?.data?.msg, toastOption);
        setDisabled(false);
      }
    })
  }

  const handleSubmit = async() => {
    setDisabled(true);
    
    try {
      logMeIn();
    } catch (e) {
      toast.error("Unable to process", toastOption);
      setDisabled(false);
    }
  }

  return (
    <>
      <Header token={removeToken}/>

      <div className={css.container}>
        <div className={css.right}>
          <Box
            component="main"
            sx={{
              alignItems: "center",
              display: "flex",
              flexGrow: 1,
              minHeight: "100%",
            }}
          >
            <Container maxWidth="sm">
              <h2> Sign In </h2> 

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  error={Boolean(
                    formik.touched.username && formik.errors.username
                  )}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.username}
                  variant="outlined"
                />
                
                <TextField
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />

                <Box sx={{ py: 2 }}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={disabled}
                  >
                    Sign In Now
                  </Button>
                </Box>
              </form>

                <Typography color="textSecondary" >
                  <ReactLink 
                      to="/forgot-password"
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      Forgot Password?
                  </ReactLink>
                </Typography>
            </Container>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login;

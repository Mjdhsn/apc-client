import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import Header from "../../compononts/header";
import useToken from '../../compononts/useToken'
import css from "./register.module.scss";
import AuthImg from "../../assets/auth.png";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

const Register = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState(false);
  const { removeToken } = useToken();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Not a proper Email").max(255).required("Email is required"),
      username: Yup.string().max(255).min(4, "Should contain atleast 4 characters").required("Username is required"),
      password: Yup.string().max(255).min(5, "Should contain atleast 5 characters").required("Password is required"),
      confirmPass: Yup.string().max(255).required("Confirm Password is required"),
    }),
    onSubmit: () => {
      setDisabled(true);
      if(formik.values.password !== formik.values.confirmPass)
      {
        toast.error("Confirm Password should be same", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }
      
      setDisabled(false)
    },
  });

  return (
    <>
      <Header token={removeToken}/>
      <div className={css.container}>
        <div className={css.left}>
          <img src={AuthImg} alt="auth" />
          <span>  </span>
        </div>
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
              <span className={css.logo}>Election</span>
              <form onSubmit={formik.handleSubmit}>
              <TextField
                  error={Boolean(
                    formik.touched.email && formik.errors.email
                  )}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.email}
                  variant="outlined"
                />
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
                <TextField
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  fullWidth
                  helperText={formik.touched.confirmPass && formik.errors.confirmPass}
                  label="Confirm Password"
                  margin="normal"
                  name="confirmPass"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="confirmPass"
                  value={formik.values.confirmPass}
                  variant="outlined"
                />

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={disabled}
                  >
                    Create account
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Already have an account?{" "}
                  <ReactLink to="/login"
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      Sign In
                  </ReactLink>
                </Typography>
              </form>
            </Container>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Register;

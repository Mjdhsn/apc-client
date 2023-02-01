import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import React from 'react'
import {
  Box,
  Container,
  TextField,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
//
import css from './set-password.module.scss'
import { usePost } from "../../hooks/useFetch";
import { toastOption } from "../../utils/toastOption";
import Button from "../../compononts/Button";


const SetPassword = () => {

  // states
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  // hook
  const { id } = useParams()
  const navigate = useNavigate();
  const activeData = usePost(`/set-password/${id}`)

  // destructured
  const { mutate, isSuccess, data, isError, error, isLoading } = activeData

  // formik datas
  var initValues = {
    password: "",
    passwordConfirmation : ""
  }

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      password: Yup.string().max(255).required("Password is required"),
      passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: () => {
      handleSubmit()
    },
  });

  
  // password handle
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // handle submit func
  const handleSubmit = async() => {
    await mutate({ ...formik.values })
  }


  // use effect
  useEffect(() => {
      
    if(isSuccess){
      toast.success(data?.data?.msg, toastOption);
      navigate('/')
    }else if(isError){
      toast.error(error.response?.data?.msg, toastOption);
    }
    
  }, [ isSuccess, isError ])

  return (
    <div className={css.active} >
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
          <form onSubmit={formik.handleSubmit}>
            <h4 className={css.title} > Update password </h4>

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
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              variant="outlined"
              InputProps={{
                endAdornment : (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              error={Boolean(
                formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
              )}
              fullWidth
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
              label="Confirm Password"
              margin="normal"
              name="passwordConfirmation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showConPassword ? 'text' : 'password'}
              value={formik.values.passwordConfirmation}
              variant="outlined"
              InputProps={{
                endAdornment : (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConPassword((show) => !show)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                Update
              </Button>
            </Box>
            
          </form>
        </Container>
      </Box>
    </div>
  )
}

export default SetPassword
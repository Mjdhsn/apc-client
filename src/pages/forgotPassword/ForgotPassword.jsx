import { useNavigate } from "react-router-dom";
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
//
import css from './forgotPassword.module.scss'
import { usePost } from "../../hooks/useFetch";
import { toastOption } from "../../utils/toastOption";
import Button from "../../compononts/Button";


const ForgotPassword = () => {

  // hook
  const navigate = useNavigate();
  const forgotData = usePost(`/forgot-password`)

  // destructured
  const { mutate, isSuccess, data, isError, error, isLoading } = forgotData

  // formik datas
  var initValues = { email: "" }

  const formik = useFormik({
    initialValues: initValues,

    validationSchema: Yup.object({
      email: Yup.string().email("Not a proper Email").max(255).required("Email is required"),
    }),

    onSubmit: () => {
      handleSubmit()
    },
  });

  
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
            <h4 className={css.title} > Verify email to set new password </h4>

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

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                Verify
              </Button>
            </Box>
            
          </form>
        </Container>
      </Box>
    </div>
  )
}

export default ForgotPassword
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAtom } from "jotai";
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
import css from './active.module.scss'
import { usePost } from "../../hooks/useFetch";
import { toastOption } from "../../utils/toastOption";
import avatar from '../../assets/avatar-demo.png'
import {AiOutlineCamera} from 'react-icons/ai'
import { uploadImage } from "../../utils/uploadImage";
import { authInit } from "../../config/state";
import Button from "../../compononts/Button";


const Active = () => {

  // states
  const [selectedAvatar, setSelectedAvatar] = useState([])
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  // hook
  const { id } = useParams()
  const navigate = useNavigate();
  const [auth, setAuth] = useAtom(authInit)
  const activeData = usePost(`/active/${id}`)

  // destructured
  const { mutate, isSuccess, data, isError, error } = activeData

  // formik datas
  var initValues = {
    username: "",
    password: "",
    passwordConfirmation : ""
  }

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      username: Yup.string().max(255).min(4, "Minimum 4 characters required").required("Username is required"),
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
    setIsSubmiting(true)
    
    // upload image
    let res;

    if(selectedAvatar.length > 0){
      res = await uploadImage(selectedAvatar)
    }

    await mutate({ ...formik.values, avatar: res})
  }


  // use effect
  useEffect(() => {
      
    if(isSuccess){
      toast.success(data?.data?.msg, toastOption);
      setIsSubmiting(false)
      setSelectedAvatar([])
      navigate('/')
    }else if(isError){
      toast.error(error.response?.data?.msg, toastOption);
      setIsSubmiting(false)
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
            <h4 className={css.title} > Fill information and setup account </h4>

            <div className={css.avatar_wrapper} >
                <div className={css.avatar} >
                  <img src={selectedAvatar.length === 0 ? avatar : URL.createObjectURL(selectedAvatar[0])} /> 
                </div>

               <input type='file' name="avatar" accept="image/x-png,image/jpeg,image/jpg" onChange={(e) => setSelectedAvatar([ e.target?.files[0] ])} />
               <div> <AiOutlineCamera /> </div>
            </div>

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
                loading={isSubmiting}
              >
                Active
              </Button>
            </Box>
            
          </form>
        </Container>
      </Box>
    </div>
  )
}

export default Active
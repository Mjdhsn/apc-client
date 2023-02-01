import * as Yup from "yup";
import { useAtom } from "jotai";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
//
import {
    Box,
    Button,
    Container,
    TextField,
} from "@mui/material";
//
import css from "../User.module.scss";
import { authInit } from "../../../config/state";
import { useGet, usePatch, usePost } from "../../../hooks/useFetch";
import { toastOption } from "../../../utils/toastOption";
import Header from "../../../compononts/header";
import Loader from "../../../compononts/Loader/Loader";
import { uploadImage } from "../../../utils/uploadImage";
import {AiOutlineCamera} from 'react-icons/ai'

const EditUser = () => {

    // state
    const [selectedAvatar, setSelectedAvatar ] = useState([])

    // hook
    const { id } = useParams()
    const navigate = useNavigate()
    const updateData = usePatch(`user/${id}`)
    const userData = useGet(`user/${id}`)
    const [auth, setAuth] = useAtom(authInit)

    // data destructured
    const { mutate, data, isLoading, isSuccess, isError, error } = updateData 
    const { data : userInfo , isLoading : userLoading } = userData

    // formik
    const formik = useFormik({
        initialValues: {
            aspirant_name: userInfo?.data?.aspirant_name,
            name: userInfo?.data?.name,
            aspirant_email: userInfo?.data?.aspirant_email,
            email: userInfo?.data?.email,
            phone: userInfo?.data?.phone,
        },

        validationSchema: Yup.object({
            email: Yup.string().email("Not a proper Email").max(255).required("Email is required"),
            aspirant_email: Yup.string().email("Not a proper Email").max(255).required("Email is required"),
            name: Yup.string().max(255).min(4, "Should contain atleast 4 characters").required("Name is required"),
            aspirant_name: Yup.string().max(255).min(4, "Should contain atleast 4 characters").required("Aspirant Name is required"),
            phone: Yup.string().matches('Phone number is not valid'),
        }),

        onSubmit: () => {
            handleSubmit()
        },

        enableReinitialize : true
    });

    // submit form
    const handleSubmit = async () => {
        // upload image
        let res;
    
        if(selectedAvatar.length > 0){
          res = await uploadImage(selectedAvatar)
        }

        await mutate({ ...formik.values, aspirant_avatar : res })
    }

    // use effect
    useEffect(() => {
        if(isSuccess){
            toast.success(data?.data?.msg, toastOption);
        }else if(isError){
            toast.error(error.response?.data?.msg, toastOption);
        }            
    }, [ isSuccess, isError ])


    if(userLoading) return <Loader />

    return (
        <>
            <Header />

            <div className={css.container}>

                <h2> Edit User </h2>

                <div>
                    <div className={css.back} onClick={() => { navigate(-1) }} >
                       <BsFillArrowLeftCircleFill /> 
                    </div>

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

                                    <TextField
                                        error={Boolean(
                                            formik.touched.name && formik.errors.name
                                        )}
                                        fullWidth
                                        helperText={formik.touched.name && formik.errors.name}
                                        label="Full name"
                                        margin="normal"
                                        name="name"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.name}
                                        variant="outlined"
                                    />

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
                                        fullWidth
                                        label="Phone Number"
                                        margin="normal"
                                        name="phone"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.phone}
                                        variant="outlined"
                                    />

                                    <div className={css.aspirant} >
                                        <div>
                                            <TextField
                                                error={Boolean(
                                                    formik.touched.aspirant_name && formik.errors.aspirant_name
                                                )}
                                                fullWidth
                                                helperText={formik.touched.aspirant_name && formik.errors.aspirant_name}
                                                label="Aspirant name"
                                                margin="normal"
                                                name="aspirant_name"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="text"
                                                value={formik.values.aspirant_name}
                                                variant="outlined"
                                            />

                                            <TextField
                                                error={Boolean(
                                                    formik.touched.aspirant_email && formik.errors.aspirant_email
                                                )}
                                                fullWidth
                                                helperText={formik.touched.aspirant_email && formik.errors.aspirant_email}
                                                label="Aspirant email"
                                                margin="normal"
                                                name="aspirant_email"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="text"
                                                value={formik.values.aspirant_email}
                                                variant="outlined"
                                            />                                           
                                        </div>
                                        
                                        <div>
                                            <p> Aspirant image </p>

                                            <div className={css.avatar_wrapper} >
                                                <div className={css.avatar} >
                                                    <img src={selectedAvatar.length === 0 ? userInfo?.data?.aspirant_avatar : URL.createObjectURL(selectedAvatar[0])} /> 
                                                </div>

                                                <input type='file' name="avatar" accept="image/x-png,image/jpeg,image/jpg" onChange={(e) => setSelectedAvatar([ e.target?.files[0] ])} />
                                                <div> <AiOutlineCamera /> </div>
                                            </div>                                        
                                        </div>
                                                            
                                    </div>

                                    <Box sx={{ py: 2 }}>
                                        <Button
                                            color="primary"
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            disabled={isLoading || selectedAvatar.length === 0 && !formik.dirty}
                                            onClick={handleSubmit}
                                        >
                                            update
                                        </Button>
                                    </Box>
                                </form> 
                        </Container>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default EditUser;
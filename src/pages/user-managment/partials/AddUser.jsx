import React, { useState } from "react";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import * as Yup from "yup";
import {
    Box,
    Container,
    InputLabel,
    TextField,
    MenuItem,
    Select
} from "@mui/material";
//
import css from "../User.module.scss";
import { presidentialCountryLevel, presidentialLgaLevel, presidentialPollingLevel, presidentialStateLevel, presidentialWardLevel, senateNationalLevel, senateDistrictLevel, senateLgaLevel, senatePollingLevel, senateWardLevel, repPollingLevel, repWardLevel, repLgaLevel, repConstituencyLevel, repNationalLevel, levelData, levelNext, roleData, conditionalLevel, electionType, conditionalRoute, adminRoute, roleDefination } from '../../../config/constant';
import { camelize } from "../../../utils/camalize";
import { useEffect } from "react";
import { PresidentialSelectBoxes, RepSelectBoxes, SenateSelectBoxes } from "../../../shared/SelectBoxes/UserSelectBoxes";
import { usePost } from "../../../hooks/useFetch";
import { authInit } from "../../../config/state";
import { toast } from "react-toastify";
import { toastOption } from "../../../utils/toastOption";
import avatar from '../../../assets/avatar-demo.png'
import {AiOutlineCamera} from 'react-icons/ai'
import { uploadImage } from "../../../utils/uploadImage";
import Button from '../../../compononts/Button'
import axios from "axios";
import { EAMIL_VALIDATION_API_KEY } from "../../../config";


// initial child list
const presidentialChilds = { pollingUnit : presidentialPollingLevel, ward : presidentialWardLevel, state : presidentialStateLevel, lga : presidentialLgaLevel, country : presidentialCountryLevel }
const senateChilds = { pollingUnit : senatePollingLevel, ward : senateWardLevel, lga : senateLgaLevel, senateDistrict : senateDistrictLevel, national : senateNationalLevel }
const repChilds = { pollingUnit : repPollingLevel, ward : repWardLevel, lga : repLgaLevel, constituency : repConstituencyLevel, national : repNationalLevel }


const AddUser = () => {

    // state
    const [disabled, setDisabled] = useState(false);
    const [childs, setChilds] = useState({ ...presidentialPollingLevel })
    const [auth, setAuth] = useAtom(authInit)
    const [selectedAvatar, setSelectedAvatar ] = useState([])

    // hook
    const regData = usePost('register')

    // data destructured
    const { mutate, data, isSuccess, isError, error } = regData 

    // formik
    const formik = useFormik({
        initialValues: {
            aspirant_name: "",
            name: "",
            aspirant_email: "",
            type_of_election:  "presidential",
            email: "",
            role: auth?.role === 'admin' || auth?.role === 'ppa' || auth?.role === 'spa' || auth?.role === 'rpa' ? "" : roleData[auth?.role][0],
            phone: "",
        },

        validationSchema: Yup.object({
            email: Yup.string().email("Not a proper Email").max(255).required("Email is required"),
            aspirant_email: Yup.string().email("Not a proper Email").max(255).required("Email is required"),
            name: Yup.string().max(50).min(4, "Should contain atleast 4 characters").required("Name is required"),
            type_of_election: Yup.string().max(50).required("Name is required"),
            aspirant_name: Yup.string().max(50).min(4, "Should contain atleast 4 characters").required("Aspirant Name is required"),
            phone: Yup.string().matches('Phone number is not valid'),
            role: Yup.string().required("Please Select User Role"),
        }),

        onSubmit: () => {
            handleSubmit()
        },
    });

    // use effect
    useEffect(() => {

        if(formik.values.level_parent === "presidential"){
            setChilds(presidentialChilds[formik.values.level])
        }else if(formik.values.level_parent === "senate"){
            setChilds(senateChilds[formik.values.level])
        }else if(formik.values.level_parent === "rep"){
            setChilds(repChilds[formik.values.level])
        }

    }, [formik.values.level])

    useEffect(() => {

        if(isSuccess){
            toast.success(data?.data?.msg, toastOption);
  
            Object.keys(formik.initialValues).map((e, i) => {
              formik.values[e] = formik.initialValues[e]
            })
            
            setChilds({ ...presidentialPollingLevel })
            setSelectedAvatar([])
            setDisabled(false)
  
        }else if(isError){
            toast.error(error.response?.data?.msg, toastOption);
            setDisabled(false)
        }

    }, [isSuccess, isError])


    // submit form
    const handleSubmit = async () => {
        setDisabled(true)
        
        // upload image
        let res;
    
        if(selectedAvatar.length > 0){
          res = await uploadImage(selectedAvatar)
        }

        await mutate({ ...formik.values, level_childs : childs, manager : auth?._id, aspirant_avatar : res })
    }


    return (
        <>
            <div className={css.container}>

                <div  >
                    <Box
                        component="main"
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexGrow: 1,
                            minHeight: "100%",
                        }}
                    >
                        <Container maxWidth="sm" className={css.user_card} >
                            <form onSubmit={formik.handleSubmit} >

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

                                <div className={css.select}>
                                    <InputLabel id="demo-simple-select-label">Type of election</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formik.values.type_of_election}
                                        label="Type of election"
                                        name="type_of_election"
                                        onChange={e => { formik.handleChange(e) }}
                                    >
                                        {auth?.role !== 'admin' && electionType.map((e, i) => conditionalRoute[auth?.role]?.includes(e) && <MenuItem key={i} value={e.toLowerCase()} > {camelize(e)} </MenuItem>)}
                                        {auth?.role === 'admin' && electionType.map((e, i) => <MenuItem key={i} value={e.toLowerCase()} > {camelize(e)} </MenuItem>)}
                                    </Select>
                                </div>

                                <div className={css.select}>
                                    <InputLabel id="demo-simple-select-label">Select User Role</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formik.values.role}
                                        label="User role"
                                        name="role"
                                        onChange={e => { formik.handleChange(e) }}
                                    >
                                        {auth?.role !== 'admin' && roleData[auth?.role].map((e, i) => <MenuItem key={i} value={e.toLowerCase()} > {roleDefination[e]} </MenuItem>)}
                                        {auth?.role === 'admin' && adminRoute[formik.values.type_of_election].map((e, i) => <MenuItem key={i} value={e.toLowerCase()} > {roleDefination[e]} </MenuItem>)}
                                    </Select>
                                </div>

                                <div className={css.childs} >
                                    {conditionalLevel[formik.values.role]?.includes("presidential") && <PresidentialSelectBoxes searchFields={childs} setSearchFields={setChilds} searchLevel={conditionalLevel[formik.values.role][1]} />}
                                    {conditionalLevel[formik.values.role]?.includes("senate") && <SenateSelectBoxes searchFields={childs} setSearchFields={setChilds} searchLevel={conditionalLevel[formik.values.role][1]} count={5} />}
                                    {conditionalLevel[formik.values.role]?.includes("rep") && <RepSelectBoxes searchFields={childs} setSearchFields={setChilds} searchLevel={conditionalLevel[formik.values.role][1]} />}
                                </div>
                                
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
                                                <img src={selectedAvatar.length === 0 ? avatar : URL.createObjectURL(selectedAvatar[0])} /> 
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
                                        loading={disabled}
                                        onClick={handleSubmit}
                                    >
                                        Add User
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

export default AddUser;
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import {AiOutlineCamera} from 'react-icons/ai'
//
import css from './profile.module.scss'
import AvatarPic from '../../assets/avatar-demo.png'
//
import Header from '../../compononts/header'
import useToken from '../../compononts/useToken'
import { useGet, usePatch } from '../../hooks/useFetch'
import { toastOption } from '../../utils/toastOption'
import { Loader } from '@mantine/core'
import { authInit } from '../../config/state'
import { uploadImage } from '../../utils/uploadImage'
import { Button } from '@mantine/core'


const Index = () => {

  // states
  const [pData, setPData] = useState()
  const [updateLoading, setUpdateLoading] = useState(false)

  // hooks
  const { id } = useParams()
  const profileData = useGet(`user/${id}`)
  const { removeToken } = useToken()  
  const [auth, setAuth] = useAtom(authInit)
  const navigate = useNavigate()
  const { mutate, isSuccess : updateSuccess, isError : updateIsErr, error : updateErr, data : updateData } = usePatch(`update-avatar`)

  const [selectedAvatar, setSelectedAvatar] = useState([])

  // destructure data
  const { data, isSuccess, isError, error, isLoading, isFetching } = profileData

  // use Effect
  useEffect(() => {
      if(isSuccess){
          setPData(data.data)
      }else if(isError){
          toast.error(error.response?.data?.msg, toastOption);
      }            
  }, [isSuccess, isError])

  useEffect(() => {
    if(updateSuccess){
      toast.success(updateData?.data?.msg, toastOption);
      setUpdateLoading(false)
    }else if(isError){
      toast.error(updateErr.response?.data?.msg, toastOption);
      setUpdateLoading(false)
    }
  }, [ updateSuccess, updateIsErr ])


  // handle submit func
  const updateAvatar = async() => {
    setUpdateLoading(true)
    
    // upload image
    let res;

    if(selectedAvatar.length > 0){
      res = await uploadImage(selectedAvatar)
    }

    await mutate({ avatar: res[0].url, id })
  }


  if(isLoading) return <Loader />

  return (
    <>
      <Header token={removeToken} />

      <div className={css.profile} >
        
        <div className={css.back} onClick={() => { navigate(-1) }} >
          <BsFillArrowLeftCircleFill /> 
        </div>

        <div className={css.profile_card} > 

          <div className={css.profile_photos} >
            <div className={css.avatar_wrapper} >
                <div className={css.avatar} >
                  <img src={selectedAvatar.length === 0 ? auth?.avatar : URL.createObjectURL(selectedAvatar[0])} /> 

                  {isFetching && <div className={css.avatarLoading} >
                    <Loader />
                  </div>}

                  <input type='file' name="avatar" accept="image/x-png,image/jpeg,image/jpg" onChange={(e) => setSelectedAvatar([ e.target?.files[0] ])} />
                  <div className={css.outline_avatar} > <AiOutlineCamera /> </div>
                </div>
            </div>

            {selectedAvatar.length > 0 && <Button onClick={() => updateAvatar()}  loading={updateLoading} style={{ background : "#ee2a2d" }} > Update </Button>}
          </div>

          <div className={css.profile_info} >
             
             <div className={css.profile_info_field} >
                <h4> Username </h4>
                <div> {pData?.username && pData?.username} </div>
             </div>
             
             <div className={css.profile_info_field} >
                <h4> Full name </h4>
                <div> {pData?.name && pData?.name} </div>
             </div>
             
             <div className={css.profile_info_field} >
                <h4> Email </h4>
                <div> {pData?.email && pData?.email} </div>
             </div>
             
             <div className={css.profile_info_field} >
                <h4> Phone </h4>
                <div> {pData?.phone && pData?.phone} </div>
             </div>
             
             <div className={css.profile_info_field} >
                <h4> Level </h4>
                <div> {pData?.type_of_election && pData?.type_of_election} </div>
             </div>

             {pData?.manager && <div className={css.profile_info_manager} >

                <h4> {auth?.role === pData?.role ? "My" : pData?.name} manager </h4>

                <Link to={`/profile/${pData?.manager._id}`} >
                  <div className={css.profile_info_manager_info} >

                    <div className={css.profile_info_manager_avatar} >
                      <img src={pData?.manager?.avatar ? pData?.manager?.avatar : AvatarPic} />  
                    </div>

                    <div className={css.profile_info_manager_texts} > 
                      <h2> {pData?.manager?.name && pData?.manager?.name} </h2>
                      <p>  {pData?.manager?.email && pData?.manager?.email} </p>
                    </div>

                  </div>                
                </Link>
             </div>}

          </div>

        </div>
        
      </div>
    </>
  )
}

export default Index
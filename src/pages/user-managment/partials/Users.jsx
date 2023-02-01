import { toast } from 'react-toastify'
import { useAtom } from 'jotai'
import { Switch } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { DataTable } from 'mantine-datatable'
import { Link, useNavigate, useParams } from 'react-router-dom'
//
import { authInit } from '../../../config/state'
import { usePatch } from '../../../hooks/useFetch'
import { toastOption } from '../../../utils/toastOption'
import css from '../User.module.scss'


const Users = () => {

  // hooks
  const [auth, setAuth] = useAtom(authInit)
  const { mutate, isSuccess, isError, error, data } = usePatch(`update-status`)

  // states
  const [records, setRecords] = useState(auth?.agents)

  // handle update status
  const handleStaus = async ( e, id ) => {
    await mutate({ status : e.target.checked, id })
  }

  // use effect
  useEffect(() => {
    if(isSuccess){
      toast.success(data?.data?.msg, toastOption);
    }else if(isError){
      toast.error(error.response?.data?.msg, toastOption);
    }            
  }, [ isSuccess, isError ])


  // ----------- TABLE MODIFICATION -----------
  const columns = [
    { accessor: "name", textAlignment: "left" },
    { accessor: "email", textAlignment: "left" },
    { accessor: "phone", textAlignment: "left" },
    { accessor: "role", textAlignment: "left" },
    { 
      accessor: "status", 
      textAlignment: "left",
      render: (render) => ( 
        <>
          <Switch onChange={(e) => handleStaus(e, render?._id)} defaultChecked={render?.status} />
        </> 
      ),
    },
    { 
      accessor: "action", 
      textAlignment: "left",
      render: (render) => (
        <Link to={`/edit-user/${render._id}`} >
          <button 
            className="button"
          >
            Edit
          </button>        
        </Link>
      ),
    }
  ]
  // ----------- TABLE MODIFICATION -----------


  return (
    <div className={css.user_card} >
       
        {/* ---- DATA TABLE ---- */}
        <DataTable
          withBorder
          height={records.length === 0 && 200}
          columns={columns}
          records={records}
        />

    </div>
  )
}

export default Users
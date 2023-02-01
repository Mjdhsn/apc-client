import { useAtom } from 'jotai'
import { Outlet, Navigate } from 'react-router-dom'
//
import { authInit } from '../config/state'


const PrivateRoutes = () => {
    const [auth, setAuth] = useAtom(authInit)

    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
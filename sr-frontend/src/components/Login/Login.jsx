import React, { useContext } from "react"
import { UserContext } from "../../contexts/contexts";

const Login = () => {

    const { setUser } = useContext(UserContext);

    return (
        <>
            Prijava
        </>

    )

}

export default Login;
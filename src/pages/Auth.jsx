import { useState } from 'react'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { Box } from '@chakra-ui/react'

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    const handleAuthPageToggle = () => {
        setIsLogin((prev) => !prev)
    }

    return (
        <Box>
            {isLogin ? (
                <Login switchAuthHandler={handleAuthPageToggle}/>
            ) : (
                <Register switchAuthHandler={handleAuthPageToggle} />
            )}
        </Box>
    )
}
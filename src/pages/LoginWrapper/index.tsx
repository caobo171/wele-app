import React, {PropsWithChildren } from 'react';
import { useCurrentUser } from '@/store/user/hooks';
import Login from '../Login';


const LoginWrapper = React.memo(({children}: PropsWithChildren<{}>)=>{
    const user = useCurrentUser();
    return (
        <>
            {
                user ? <>{children}</> : <Login/>
            }
        </>
    )
});
    


export default LoginWrapper;
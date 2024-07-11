import axios from "axios";
import React, { useEffect, useState,ReactNode} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import type {AxiosResponse} from 'axios';

type Props = {
    children: ReactNode;
};

export const jwtAxios = axios.create({
    baseURL: 'http://localhost:8100/api/', // YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
jwtAxios.interceptors.response.use(
    (res: AxiosResponse<any, any>) => res,
    (err: any) => {
        if (err.response && err.response.data.msg === 'Token is not valid') {
            console.log('Need to logout user');
        }
        return Promise.reject(err);
    }
);


export const setAuthToken = (token?: string) => {
    if (token) {
        jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete jwtAxios.defaults.headers.common.Authorization;
        localStorage.removeItem('token');
    }
};


const AppAuthProvider = ({ children }: Props) => {

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }

    useEffect(() => {
        var public_urls = ['/sign-in','/sign-up']
        if (!public_urls.includes(window.document.location.pathname)){
            var user_auth = false
            setLoading(true)
            const getAuthUser = async () => {
                const token = localStorage.getItem('token');
                if (token) {
                    await jwtAxios
                        .get('v1/account/profile/')
                        .then((res: any) => {
                            user_auth = true
                            setLoading(false)
                        }).catch(() => {
                            setLoading(false)
                            setAuthToken()
                        });
                }
                setLoading(false)
                !user_auth && window.location.replace("/sign-in");

            };
            getAuthUser();
        }else{
            setLoading(false)
            if (!public_urls.includes(window.document.location.pathname)) {
                window.location.replace("/");
            }
        }


    }, []);



    return  loading ? <Spinner animation="border" variant="primary" />:(<>{children}</>)
};

export default AppAuthProvider;
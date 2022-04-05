import Login from './Login/Login'
import Register from './Register/Register';
import RegisterTransfer from './Transfer/RegisterTransfer';
import LoginTransfer from './Transfer/LoginTransfer';
import ModifyPwd from './ModifyPwd/ModifyPwd';
import {getTimeStamp, oauth} from '../../components/oauth/oauth'
import base64url from 'base64url'
import API from "../API";
import Axios from "axios/index";
import {JSEncrypt} from "jsencrypt";

function RSA() {
    return getTimeStamp().then(oauth)
}

function Encryption(data, publicKey){
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(base64url.toBase64(publicKey));
    return base64url.fromBase64(encrypt.encrypt(data));
}

function PublicKey() {
    let url = API.gateway + '/user-server/v1/account/RSAPublicKey';
    return Axios.get(url).then(data => data.data);
}

const loginConfig = [
    {
        path: '/login',
        component: Login,
        isLogin: true
    },
    {
        path: '/register',
        component: Register,
        isLogin: true
    },
    {
        path: '/register/transfer',
        component: RegisterTransfer,
        isLogin: true
    },
    {
        path: '/modifyPwd',
        component: ModifyPwd,
        isLogin: true
    }
];


export {Login, Register, RegisterTransfer, ModifyPwd, LoginTransfer, RSA, Encryption, PublicKey, loginConfig};

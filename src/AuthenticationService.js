import axios from 'axios';

export const USER_SESSION = 'user';

class AuthenticationService {
    getToken(){
        const obj = localStorage.getItem(USER_SESSION);
        if(obj === null){
            return '';
        }
        return JSON.parse(obj).token;
    }
    getUser(){
        const obj = localStorage.getItem(USER_SESSION);
        return JSON.parse(obj).user;
    }
    getRoles(){
        const user = this.getUser();
        return user.roles;
    }
    isConnected(){
        const obj = localStorage.getItem(USER_SESSION);
        return obj !== null;
    }
    AxiosInterceptorAddBearer(token){
        /*axios.interceptors.request.use(config => {
            config.headers.Authorization =  token;
            return config;
        });*/
        /*axios.interceptors.request.use(
            config => {
                //const {origin} = new URL(config.url);
               // const allowedOrigins = [URL_BACKEND];
                //if(allowedOrigins.includes(origin)){
                    config.headers.authorization = token;
                //}
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        )*/
        axios.defaults.headers.common['Authorization'] = token;
    }
    JwtAuthentication(obj){
        const user = JSON.stringify(obj);
        localStorage.setItem(USER_SESSION, user);
        this.AxiosInterceptorAddBearer('Bearer ' + obj.token);
    }
    refreshToken(obj){
        this.logout();
        this.JwtAuthentication(obj);
    }
    AddBearerHeader(){
        this.AxiosInterceptorAddBearer("Bearer " + this.getToken());
    }
    logout() {
        this.AxiosInterceptorAddBearer('');
        localStorage.removeItem(USER_SESSION);
    }
}

export default new AuthenticationService();

import AxiosService from "./AxiosService";

export default class UserService extends AxiosService {
    async login(email) {
        const { data } = await this.post(`/login?email=${email}`);

        localStorage.setItem("user", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);
    }

    async signUp(body) {
        return this.post('/signup', body);
    }

    loggedIn() {
        return localStorage.getItem('token') !== null;
    }
}
import AxiosService from "./AxiosService";

export default class HomeService extends AxiosService {
    async publicCatalogue() {
        return await this.get('/home');
    }
}
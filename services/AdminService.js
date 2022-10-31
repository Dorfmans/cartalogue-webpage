import AxiosService from "./AxiosService";

export default class AdminService extends AxiosService {
    async getCatalogue(email) {
        return this.get(`/admin?email=${email}`);
    }

    async postVehicle(email, body) {
        return this.post(`/admin?email=${email}`, body);
    }

    async putVehicle(vehicleId, body) {
        return this.put(`/admin?vehicleId=${vehicleId}`, body);
    }

    async deleteVehicle(vehicleId) {
        return this.delete(`/admin?vehicleId=${vehicleId}`)
    }
}
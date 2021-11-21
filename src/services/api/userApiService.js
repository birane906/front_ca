import axios from "axios";

class UserServiceApi {
    static async getUserByMail(mail) {
        return new Promise((resolve, reject) => {
            axios.get("/api/user-service/users", {
                params: {
                    mail: mail,
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => reject(error))
        }) 
    }
}

export default UserServiceApi;
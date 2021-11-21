import axios from "axios"

class AuthApiService {
    static authenticate(mail, password) {
        return new Promise((resolve, reject) => {
            axios.post("/authenticate", {
               mail: mail,
               password: password,
           })
               .then(response => {
                   const token = response.data.jwt
                   resolve(token)
               })
               .catch(e => reject(e))
        })
    }
}

export default AuthApiService
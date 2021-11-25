import axios from 'axios'

class DocumentApiService {
    static vaccine = {
        getByUserId: (id) => {
            return new Promise((resolve, reject) => {
                axios.get("/api/vaccine-service/vaccines", {
                    params: {
                        userId: id
                    }
                })
                    .then((response) => {
                        const vaccines = response.data
                        resolve(vaccines)
                    })
                    .catch((error) => reject(error))
            })
        }
    }
    static test = {
        getByUserId: (id) => {
            return new Promise((resolve, reject) => {
                axios.get("/api/test-service/vaccines", {
                    params: {
                        userId: id
                    }
                })
                    .then((response) => {
                        const content = response.data.content
                        delete response.data.content
                        const tests = {...response.data, ...content}
                        resolve(tests)
                    })
                    .catch((error) => reject(error))
            })
        }
    }
}

export default DocumentApiService
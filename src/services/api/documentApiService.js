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
                        const vaccines = response.data.map((vaccine) => {
                            const content = JSON.parse(vaccine.content)
                            delete vaccine.content
                            delete vaccine.userId
                            return {...vaccine, ...content}
                        })
                        resolve(vaccines)
                    })
                    .catch((error) => reject(error))
            })
        },
        addVaccine: (vaccine) => {
            return new Promise((resolve, reject) => {
                let payload = {
                    id: vaccine.id,
                    userId: vaccine.userId,
                }
                delete vaccine.id
                delete vaccine.userId
                payload = {...payload, content: JSON.stringify(vaccine)}
                axios.post("/api/vaccine-service/vaccines", payload)
                    .then((response) => {
                        const vaccine = response.data
                        const content = JSON.parse(vaccine.content)
                        delete vaccine.content
                        delete vaccine.userId
                        resolve({...vaccine, ...content})
                    })
                    .catch((error) => reject(error))
            })
        }
    }
    static test = {
        getByUserId: (id) => {
            return new Promise((resolve, reject) => {
                axios.get("/api/test-service/tests", {
                    params: {
                        userId: id
                    }
                })
                    .then((response) => {
                        const tests = response.data.map((test) => {
                            const content = JSON.parse(test.content)
                            delete test.content
                            delete test.userId
                            return {...test, ...content}
                        })
                        resolve(tests)
                    })
                    .catch((error) => reject(error))
            })
        },
        addTest: (test) => {
            return new Promise((resolve, reject) => {
                let payload = {
                    id: test.id,
                    positive: test.positive,
                    userId: test.userId,
                }
                delete test.id
                delete test.positive
                delete test.userId
                payload = {...payload, content: JSON.stringify(test)}
                console.log("payload", payload);
                axios.post("/api/test-service/tests", payload)
                    .then((response) => {
                        const test = response.data
                        const content = JSON.parse(test.content)
                        delete test.content
                        delete test.userId
                        resolve({...test, ...content})
                    })
                    .catch((error) => reject(error))
            })
        }
    }
}

export default DocumentApiService
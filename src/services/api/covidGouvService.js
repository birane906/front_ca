import axios from 'axios';

class CovidGouvService {
    static baseUrl = "/api/covid-gouv-api"
    static getLive() {
        return new Promise((resolve, reject) => {
            const url = CovidGouvService.baseUrl + "/data/live/france"
            axios.get(url)
                .then(response => {
                    const data = response.data[0]
                    resolve({
                        "hospitalisation": data.hosp,
                        "incidenceHospitalisation": data.incid_hosp,
                        "reanimation": data.rea,
                        "incidenceReanimation": data.incid_rea,
                        "nouveau24": data.conf_j1,
                    })
                })
                .catch(error => reject(error))
        })
    }
}

export default CovidGouvService
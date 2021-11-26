import axios from "axios"

class LocationApiService {
    static publishLocation(mail) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const longitude = position.coords.longitude
                    const latitude = position.coords.latitude

                    axios.post("/api/locations-service/locations/publish", {
                        longitude: longitude,
                        latitude: latitude,
                        email: mail,
                    })
                        .then(response => resolve(response.data))
                        .catch(error => reject(error))
                },
                (error) => reject(error)
            )
        })
    }
}

export default LocationApiService
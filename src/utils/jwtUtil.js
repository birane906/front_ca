import axios from 'axios';
import jwt_decode from 'jwt-decode'

class JwtUtil {
    static decode(token) {
        return jwt_decode(token);
    }
    static decodeFromHeader() {
        const auth = axios.defaults.headers.common['Authorization']
        if (!auth?.startsWith("Bearer ")) return null
        const token = auth.slice(7)
        return JwtUtil.decode(token)
    }
}

export default JwtUtil
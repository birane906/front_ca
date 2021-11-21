import jwt_decode from 'jwt-decode'

class JwtUtil {
    static decode(token) {
        return jwt_decode(token);
    }
}

export default JwtUtil
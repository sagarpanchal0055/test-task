import { jwtDecode } from 'jwt-decode';

export const jwtTokenValidate = (token) => {
	try {
		return token ? true : false; 
		// const decodedToken = jwtDecode(token);
		// const currentTime = Date.now() / 1000;
		// return decodedToken.exp > currentTime;
	} catch (error) {
		return false;
	}
};

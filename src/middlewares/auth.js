import AuthUtils from "../utils/auth";
import config from "../config/config";

export default class authMiddleware {
    	static isAuthorized(req, res, next) {
		const errorResponse = {
			status: 'error',
			code: 403,
			message: 'Token inválido ou expirado.',
		};

		const token = AuthUtils.getBearerToken(req);
		const decodedToken = AuthUtils.decodeData(token, config.secretKey);

		if (!decodedToken || !decodedToken.id) {
			res.status(403).json(errorResponse);

			return;
		}

		req.auth = {
			user_id: decodedToken.id
		};

		next();
	}
}
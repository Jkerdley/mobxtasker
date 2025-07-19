import { authService } from "../services/authService.js";

export function authMiddleware(req, res, next) {
    const authCheckResult = authService.checkAuth(req.headers.authorization.replace('Bearer ', ''));

    if (!authCheckResult.success) {
        res.status(403).json({ success: false, error: 'Access denied' });
        return;
    }

    req.user = authCheckResult.data;

    next();
}

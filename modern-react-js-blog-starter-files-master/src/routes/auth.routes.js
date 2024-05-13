import { Router } from 'express';
import { login, register, logout, profile } from '../controllers/auth.controller.js';
import { authRequire } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js'; 4
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';


const router = Router();

router.post("/app/register", validateSchema(registerSchema), register);
router.post("/app/login", validateSchema(loginSchema), login);
router.post("/app/logout", logout);
router.get("/app/profile", authRequire, profile);

export default router
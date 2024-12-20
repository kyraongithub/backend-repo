import { Router } from 'express'
import { changePassword, loginRequest, logoutRequest } from '../controllers/auth.controller'
import { apiLimiter } from '../middleware/rateLimit'
import { verifyToken } from '../middleware/authorization'

export const routerAuth: Router = Router()

routerAuth.post('/login', apiLimiter, loginRequest)
routerAuth.delete('/logout', apiLimiter, logoutRequest)
routerAuth.put('/change-password/:id', apiLimiter, verifyToken, changePassword)

import { Router } from 'express'
import { loginRequest, logoutRequest } from '../controllers/auth.controller'
import { apiLimiter } from '../middleware/rateLimit'

export const routerAuth: Router = Router()

routerAuth.post('/login', apiLimiter, loginRequest)
routerAuth.delete('/logout', apiLimiter, logoutRequest)

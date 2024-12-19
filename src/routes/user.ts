import { Router } from 'express'
import { apiLimiter } from '@/middleware/rateLimit'
import { verifyToken } from '@/middleware/authorization'
import { fetchUserData, updateUserData } from '@/controllers/user.controller'

export const routerUser: Router = Router()

routerUser.get('/user', apiLimiter, verifyToken, fetchUserData)
routerUser.put('/user/:id', apiLimiter, verifyToken, updateUserData)

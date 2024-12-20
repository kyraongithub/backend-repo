import { Router } from 'express'
import { apiLimiter } from '../middleware/rateLimit'
import { verifyToken } from '../middleware/authorization'
import { createUserData, deleteUserData, fetchUserData, updateUserData } from '../controllers/user.controller'

export const routerUser: Router = Router()

routerUser.get('/', apiLimiter, verifyToken, fetchUserData)
routerUser.post('/', apiLimiter, verifyToken, createUserData)
routerUser.put('/:id', apiLimiter, verifyToken, updateUserData)
routerUser.delete('/:id', apiLimiter, verifyToken, deleteUserData)

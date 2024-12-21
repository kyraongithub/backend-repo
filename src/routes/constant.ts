import { Router } from 'express'
import { routerUser } from './user'

export const _routes: [string, Router][] = [['/users', routerUser]]

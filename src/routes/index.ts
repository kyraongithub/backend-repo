import { Application, Router } from 'express'
import { routerUser } from './user'
import { routerAuth } from './auth'

const _routes: [string, Router][] = [
  ['/users', routerUser],
  ['/auth', routerAuth]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(`/api/v1${url}`, router)
  })
}

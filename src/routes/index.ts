import { Application, Router } from 'express'
import { routerUser } from './user'

const _routes: [string, Router][] = [['/user', routerUser]]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(`/api/v1${url}`, router)
  })
}

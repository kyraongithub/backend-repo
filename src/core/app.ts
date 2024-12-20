import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { Application } from 'express'
import session from 'express-session'
import methodOverride from 'method-override'
import { routes } from '../routes'

import bodyParser from 'body-parser'
import helmet from 'helmet'

// Boot express
const app: Application = express()
app.use(express.json())

// Access Handling
app.use(cors())
app.use(helmet())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Cross-Origin-Resource-Policy', '*')
  next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(methodOverride('_method'))

app.use(cookieParser('secret'))
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)

app.use(flash())

// Application routing
routes(app)

export { app }

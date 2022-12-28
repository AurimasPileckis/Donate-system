import express from 'express'
import cors from 'cors'
import session from 'express-session'
import { Users, Funds, Posts } from './controller/index.js'

const app = express()
 
app.use(cors())

app.use(express.json())

app.use('/uploads', express.static('uploads'))


app.use(express.urlencoded({extended: true}))

app.set('trust proxy', 1)
app.use(session({
  secret: 'labai slapta fraze',
  resave: false,
  saveUninitialized: false,
  cookie: {
     secure: false,
     maxAge: 60000000
    }
}))

app.use('/api/users/', Users)
app.use('/api/funds/', Funds)
app.use('/api/posts/', Posts)


app.listen(3000)
import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'
import { registerValidator, loginValidator } from '../middleware/validate.js'


const router = express.Router()


router.post('/register', registerValidator, async (req, res) => {
    try {
        const userExists = await db.Users.findOne({ 
            where: { 
                email: req.body.email 
            } 
        })
        
        if(userExists) {
            res.status(401).send('Toks vartotojas egzistuoja')
            return
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)

        await db.Users.create(req.body)
        res.send('Naujas aukotojas sukurtas')

    } catch(error) {

        console.log(error)
        res.status(418).send('Server error')
    }
})
router.post('/login', loginValidator, async (req, res) => {
  try {
      const user = await db.Users.findOne({ 
          where: { 
              email: req.body.email 
          } 
      })
      
      if(!user) 
          return res.status(401).send('Toks vartotojas nerastas')

      if(await bcrypt.compare(req.body.password, user.password)) {
          req.session.user = {
              id: user.id,
              email: user.email,
          }
          res.send('Prisijungimas sėkmingas')
      } else {
          res.status(401).send('Nepavyko prisijungti')
      }
  } catch(error) {
      console.log(error)
      res.status(418).send('Įvyko serverio klaida')
  }
})


router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('Atsijungimas sėkmingas')
})

router.get('/check-auth', async (req, res) => {
	try {
		res.send(req.session.user);
	} catch (err) {
		console.log(err);
		res.send('Įvyko serverio klaida');
	}
});

export default router
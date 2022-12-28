import express from 'express'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'
import { postsValidator } from '../middleware/validate.js'
import { auth } from '../middleware/auth.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const post = await db.Posts.findAll()
        res.json(post)

    } catch (error) {
        console.log(error)
        res.status(500).send('Techninė klaida')

    }
})

Router.get('/confirmed', async (req, res) => {
	try {
		const post = await db.Posts.findAll({where: {status: 1}, order: ['isCompleted'], include: db.Funds})
		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});


Router.post('/new', upload.single('image'), postsValidator, async (req, res) => {
    try {
        if(req.file)
            req.body.image = '/uploads/' + req.file.filename

        await db.Posts.create(req.body)
        res.send('Dėkojame už Jūsų idėją, laukiama administratoriaus patvirtinimo')
    } catch(error) {
        console.log(error)
        res.status(500).send('Techninė klaida')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        await post.destroy()
        res.send('Idėja sėkmingai ištrinta')

    } catch (error) {
        console.log(error)
        res.status(500).send('Techninė klaida')

    }
})

Router.put('/confirm/:postId', auth, async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.postId)
        await post.update({ status: 1 });
        res.send('Idėja sėkmingai patvirtinta')

    } catch (error) {
        console.log(error)
        res.status(500).send('Techninė klaida')

    }
})

export default Router
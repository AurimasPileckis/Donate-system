import express from 'express';
import db from '../database/connect.js';
import { fundingsValidator } from '../middleware/validate.js';

const router = express.Router();

router.post('/new/:postId', fundingsValidator, async (req, res) => {
	try {
		req.body.postId = req.params.postId;
		await db.Funds.create(req.body);
		const post = await db.Posts.findOne({where: {id: req.params.postId}})
		post.amount_collected = post.amount_collected  + req.body.transfer
		if (post.amount_collected >= post.amount_goal) {
			post.isCompleted = 1;
		}
		await post.save()
		res.send('Dėkojame už Jūsų prisidėjimą!');
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});

export default router;
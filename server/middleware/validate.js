import Joi from 'joi'

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const {error, value} = schema.validate(req.body, options)
    
    let message = ''

    if(error) {
        switch(error.details[0].path[0]) {
            case 'first_name':
                message = 'Wrong first name'
                break
            case 'last_name': 
                message = 'Wrong last name'
                break
            case 'email': 
                message = 'Wrong e-mail'
                break
            case 'password':
                message = 'Wrong password'
                break
            case 'title':
                message = 'Field cannot be empty'
                break
            default:
                message = 'Incorrectly filled fields'
                break
        }

        return res.status(500).send(message)
    }

    req.body = value
    next()
}



export const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(), 
        password: Joi.string().min(6).max(12).required()
    })

    validate(schema, req, res, next)
}

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required()
    })

    validate(schema, req, res, next)
}

export const fundingsValidator = (req, res, next) => {
	const schema = Joi.object({
		first_name: Joi.any().required(),
		last_name: Joi.any().required(),
		transfer: Joi.number().precision(2).required()
	});
	validate(schema, req, res, next);
};

export const postsValidator = (req, res, next) => {
	const schema = Joi.object({
		text: Joi.string().required(),
		image: Joi.string(),
		amount_goal: Joi.number().precision(2).min(1).required(),
		amount_collected: Joi.number().precision(2).allow(""),
	});
	validate(schema, req, res, next);
};




export default validate
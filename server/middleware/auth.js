export const auth = (req, res, next) => {
	if (req.session.id) return next();
	return res.status(401).send('Vartotojo sesijos laikas pasibaigė');
};
export const adminAuth = (req, res, next) => {
    if(req.session.loggedin && req.session.user.role === 1)
        return next()

    res.status(401).send('Your session time is over')
}
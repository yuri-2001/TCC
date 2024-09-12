const express = require('express');
const routes = express.Router();

const validateRequest = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ msg: 'Email e senha são obrigatórios.' });
    }
    next();
};

routes.post('/teste', validateRequest, (req, res) => {
    const { email } = req.body;
    res.send({ email });
});

module.exports = routes;

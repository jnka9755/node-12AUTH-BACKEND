const { response } = require('express');
 
const createUser =  (req, res = response) => {

    const { name, email, password } = req.body;
    console.log(name, email, password);

    return res.json({
        ok: true,
        msg: 'Crear usuario'
    });
};

const loging = (req, res = response) => {

    const { email, password } = req.body;
    console.log(email, password);

    return res.json({
        ok: true,
        msg: 'Login usuario'
    });
};

const renew = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
};

module.exports = {
    createUser,
    loging,
    renew
}
const { Router } = require('express');
const { createUser, loging, renew } = require('../controller/auth');

const router = Router();

//Crear usuario
router.post( '/create-user', createUser );

//Login usuario
router.post( '/', loging);

//Validar y revalidar token
router.get( '/renew', renew);

module.exports = router;
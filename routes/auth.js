const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loging, renew } = require('../controller/auth');
const { validateFields } = require ('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//Crear usuario
router.post( '/create-user', [ 
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).isLength( {min: 6} ),
    validateFields
], createUser );

//Login usuario
router.post( '/', [ 
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).isLength( {min: 6} ),
    validateFields
] , loging );

//Validar y revalidar token
router.get( '/renew', validateJWT, renew);

module.exports = router;
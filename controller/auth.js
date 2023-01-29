const { response } = require('express');
const User = require ('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
 
const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {
        //Validar correo unico
        const user = await User.findOne({ email });
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            });
        }
        
        //Crear usuario con el modelo
        const dbuser = new User( req.body );

        //Hash la contraseña
        const salt = bcrypt.genSaltSync();
        dbuser.password = bcrypt.hashSync( password, salt );

        //Generar el JWT
        const token = await generateJWT( dbuser.id, name );
        
        //Crear usuario en DB
        await dbuser.save();

        //Generar respuesta
        return res.status(201).json({
            ok: true,
            uid: dbuser.id,
            name,
            email,
            token
        });


    }
    catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Intente nuevamente, o contacte al administrador'
        });
    }    
};

const loging = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const dbuser = await User.findOne({ email })
        if(!dbuser) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        //Validar contraseña

        const validPassword = bcrypt.compareSync( password, dbuser.password );

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        // Generar el JWT
        const token = await generateJWT( dbuser.id, dbuser.name );

        //Respuesta del servicio
        return res.status(200).json({
            ok: true,
            uid: dbuser.id,
            name: dbuser.name,
            email: dbuser.email,
            token
        });

    }
    catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Intente nuevamente, o contacte al administrador'
        });
    }

    
};

const renew = async (req, res = response) => {

    const { uid } = req;

    //Leer la DB 
    const dbUser = await User.findById(uid);


    //Generar el JWT
    const token = await generateJWT( uid );

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    });
};

module.exports = {
    createUser,
    loging,
    renew
}
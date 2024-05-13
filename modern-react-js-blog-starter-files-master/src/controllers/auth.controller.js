import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { email, password, usertype, nombreCompleto, terminos } = req.body;
    try {
        // Verifica si se aceptaron los términos
        if (!terminos) {
            return res.status(400).json({ message: "Debes aceptar los términos y condiciones" });
        }

        // Verifica si el correo electrónico ya existe en la base de datos
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json(["El correo electrónico ya existe"]);
        }

        // Genera el hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario
        const newUser = new User({
            usertype,
            email,
            password: passwordHash,
            nombreCompleto,
        });

        // Guarda el nuevo usuario en la base de datos
        const userSaved = await newUser.save();

        // Genera un token de acceso
        const token = await createAccessToken({ id: userSaved._id });

        // Envía una respuesta con los detalles del usuario registrado y el token
        res.cookie('token', token, { httpOnly: true });
        res.json({
            id: userSaved._id,
            usertype: userSaved.usertype,
            email: userSaved.email,
            nombreCompleto: userSaved.nombreCompleto,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({email})

        if(!userFound) return res.status(400).json({
            message:"user not found"
        }); 

        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json({
            message:"Incorrect"
        }); 

        
        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token, { httpOnly: true });
        res.json({
            id: userFound._id,
            usertype: userFound.usertype,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

export const logout = (req, res)=>{
    res.cookie('token',"",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile =async (req, res)=>{
    const userFound= await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({
        message:"user not found "
    });
    return res.json({
        id:userFound._id,
        usertype:userFound.usertype,
        email:userFound.email,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt,
    })
   
}
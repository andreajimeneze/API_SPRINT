import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

// referencia el archivo .env para acceder a los datos secretos
dotenv.config();

   export function newToken(usuario, clave, timeOutMin) {
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (60 * timeOutMin),
                usuario: usuario, 
                clave: clave,
            }, 
            process.env.JWT_KEY,
        );
    };
    
    export function validateToken(token) {
   
        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            try{
                const verif = jwt.verify(token, process.env.JWT_KEY);
                return verif;
            } catch {
                return null;
            }   
        });
    };

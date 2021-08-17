import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { runshell } from '../controllers/runshell';
import { contact } from '../controllers/contact';
import { login } from '../controllers/login';
import { register } from '../controllers/register';

const secret: any = process.env.JWT_SECRET;

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();


const router = Router();

router.post("/contact", multipartMiddleware, contact.sendMail);

router.post("/register", multipartMiddleware, register.registerUser);

router.post("/login", multipartMiddleware, login.loginUser);

router.post("/command-center", authenticateToken, multipartMiddleware, runshell.run);

router.all("**", (req: Request, res: Response) => {
    return res.status(200).send("page not found.");
});


export default router;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    if(!token || token == null) {
        return res.status(401).send("Unauthorized. Kindly login to continue.");
    } else {
        jwt.verify(token, secret, (err: any, user: any) => {
            if (err) {
                return res.status(403).send(err.message);
            } else {
                req.user = user;
                next();
            }
        });
    }
}

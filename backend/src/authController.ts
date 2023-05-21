import {Request, Response, NextFunction} from 'express'
// const jwt = require("jsonwebtoken");
// const pool = require('./db')

export const verifyToken =  (req: Request, res: Response, next: NextFunction) => {
    // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    //     jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, async function (err, decode) {
    //       if (err)  res.status(500).send({message: 'Invalid credentials'});
    //       const users = await pool.query(`SELECT * FROM users`)
    //       if (users.rows.length > 0) {
    //         req.user = decode?.email;
    //         next();
    //       }
    //     });
    // } else {
    //     res.status(500).send({message: 'Missing authorization header information'})
    // }
    next()
}
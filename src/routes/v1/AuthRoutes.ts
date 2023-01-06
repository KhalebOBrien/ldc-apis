import express, { Router } from "express";
import { AuthController } from "../../controllers";

export const AuthRoutes: Router = express.Router();

AuthRoutes.post("/register", AuthController.register);
AuthRoutes.post("/login", AuthController.login);

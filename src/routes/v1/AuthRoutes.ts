import express, { Router } from "express";
import { AuthController } from "../../controllers";
import { Validation } from "../../middlewares/validation/Validation";

export const AuthRoutes: Router = express.Router();

AuthRoutes.post("/register", Validation.signUpValidation, AuthController.register);
AuthRoutes.post("/login", Validation.loginValidation, AuthController.login);

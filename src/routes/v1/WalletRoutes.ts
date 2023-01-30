import express, { Router } from "express";
import { WalletController } from "../../controllers";
import { Validation } from "../../middlewares/validation/Validation";

export const WalletRoutes: Router = express.Router();

WalletRoutes.post("/wallet/fund", Validation.fundWalletValidation, WalletController.fundWallet);

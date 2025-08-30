import { Router } from "express";
import UserController from "../controllers/userController.js";

export default class Routes {
	constructor() {
		this.routes = new Router();
		this.UserController = new UserController();

	}

	setup() {
		this.routes.get("/health", (req, res) => res.status(200).send("OK"));
		//teste
		this.routes.post("/users",(req, res) => this.UserController.createUser(req, res));

		return this.routes;
	}
}

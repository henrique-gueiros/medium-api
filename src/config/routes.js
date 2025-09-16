import { Router } from "express";
import UserController from "../controllers/userController.js";
import PostController from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/index.js";

export default class Routes {
	constructor() {
		this.routes = new Router();
		this.UserController = new UserController();
		this.PostController = new PostController();
		
	}

	setup() {
		this.routes.get("/health", (req, res) => res.status(200).send("OK"));
		//teste
		this.routes.post("/users",(req, res) => this.UserController.createUser(req, res));
		this.routes.post("/login",(req, res) => this.UserController.login(req, res));
		this.routes.post("/posts", authMiddleware.isAuthorized, (req, res) => this.PostController.creatPost(req, res));


		return this.routes;
	}
}

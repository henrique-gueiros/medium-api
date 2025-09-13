import { UserService } from "../services/index.js";
import BaseController from "./base";

export default class UserController extends BaseController{
    constructor(){
        super();
        this.userService = new UserService();
    }

    async createUser(req, res){
        try{
            const { name, email, password } = req.body;
            const newUser = await this.userService.createUser({ name, email, password });

            return this.successHandler(newUser, res);
        } catch (error){
            return this.errorHandler(error, req, res);
        }
    }

    async login(req, res){
        try{
            const { email, password } = req.body;
            const result = await this.userService.login(email, password);

            return this.successHandler(result, res);

        }catch (error){
            return this.errorHandler(error, req, res);
        }
    }
}
import UserService from "../services/user";
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
}
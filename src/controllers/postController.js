import { PostService } from "../services/index.js";
import BaseController from "./base";

export default class PostController extends BaseController{
    constructor(){
        super();
        this.postService = new PostService();
    }

    async creatPost(req, res){
        try{

            const { title, content } = req.body;
            const newPost = await this.postService.createPost({ title, content });

            this.successHandler(newPost, res);
        } catch (error){
            this.errorHandler(error, req, res);
        }
    }
}
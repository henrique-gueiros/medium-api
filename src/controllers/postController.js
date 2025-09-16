import { PostService } from "../services/index.js";
import BaseController from "./base";

export default class PostController extends BaseController {
    constructor() {
        super();
        this.postService = new PostService();
    }

    async creatPost(req, res) {
        try {
            const { title, text, summary } = req.body;
            const user_id = req.auth.user_id; 

            const newPost = await this.postService.createPost({
                title,
                text,
                summary,
                user_id,
                published_at: new Date(),
            });

            this.successHandler(newPost, res);
        } catch (error) {
            res.send(error);
            this.errorHandler(error, req, res);
        }
    }
}

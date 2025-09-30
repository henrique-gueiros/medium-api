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
            this.errorHandler(error, req, res);
        }
    }

    async listPosts(req, res) {
        try {
            const options = {
                meta: {
                    ...req.query, //avaliar depois a possível "ambiguidade"
                },
                filter: {
                    ...req.filter,
                }
            }

            if (req.auth && req.auth.user_id){
                options.filter.logged_user_id = req.auth.user_id;
            }

            const posts = await this.postService.listPosts(options);
            return this.successHandler(posts, res);

        } catch (error) {
            return this.errorHandler(error, req, res);
        }
    }
}

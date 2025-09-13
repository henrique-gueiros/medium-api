import { Post } from '../models/index.js';

export default class PostService {
    async createPost(post) {
        try { 
            const newPost = await Post.create(post);
            return newPost;
        }catch (error) {
            throw error;
        }
    }
}
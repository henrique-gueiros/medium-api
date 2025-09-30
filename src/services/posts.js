import { Post } from '../models/index.js';
import { PaginationUtils } from '../utils/index.js';

export default class PostService {
    async createPost(post) {
        try { 
            const newPost = await Post.create(post);
            return newPost;
        }catch (error) {
            throw error;
        }
    }

    async listPosts(options) {
        try {
            const scopes = []; //acumular regras "dinâmicas" que eu quero aplicar na query do sequelize
            const promises = [];
            const {meta, filter} = options;

            const Pagination = PaginationUtils.config({ page: meta.page, items_per_page: 10 });

            if (filter.logged_user_id) {
                scopes.push({ name: 'withIsLiked', options: { user_id: filter.logged_user_id } });
            }

            promises.push(
                Post.scope(scopes).findAll({
                    ...Pagination.getQueryParams(),
                    raw: false,
                    where: { is_deleted: false },
                    order: [['created_at', 'DESC']],
                    attributes: ['id', 'user_id', 'title', 'text', 'total_likes', 'created_at'],
                    include: [{ model: User, as: "user", attributes: ["email", "name"] }]
                })
            )

            if (Pagination.getPage() === 1) {
                promises.push(Post.scope(scopes).count({
                        where: { is_deleted: false },
                    })
                );
            }

            const [posts, totalItems] = await Promise.all(promises);

            return {
                post,
                ...Pagination.mount(totalItems),
            }

        } catch (error) {
            throw error;
        }
    }
}
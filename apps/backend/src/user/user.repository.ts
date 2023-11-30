import { EntityRepository } from '@mikro-orm/mysql';
import { User } from './user.entity';

export class UserRepository extends EntityRepository<User> {
    async findUserStats() {
        const rawQuery = `
            SELECT
                u.username,
                MIN(a.created_at) as firstArticleDate,
                COUNT(a.id) as articleCount,
                SUM(a.favorites_count) as totalFavorites
            FROM user u
            LEFT JOIN article a ON u.id = a.author_id
            GROUP BY u.id
            ORDER BY totalFavorites DESC
        `;

        return this.em.execute(rawQuery);
    }
}

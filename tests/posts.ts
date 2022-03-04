import * as TikTokScraper from '../src/index';
import { options } from './options';

const TARGET_USER = 'livshelby84662';

(async () => {
    try {
        const posts = await TikTokScraper.user(TARGET_USER, options);
        console.log(posts.collector);
    } catch (error) {
        console.log(error);
    }
})();

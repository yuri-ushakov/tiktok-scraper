import * as TikTokScraper from '../src/index';
import { options } from './options';

const TARGET_USER = 'milanispeight02364';

(async () => {
    try {
        const user = await TikTokScraper.getUserProfileInfo(TARGET_USER, options);
        console.log(user);

        /* const posts = await TikTokScraper.user(TARGET_USER, options);
        console.log(posts.collector); */
    } catch (error) {
        console.log(error);
    }
})();

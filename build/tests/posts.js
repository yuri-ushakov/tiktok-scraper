"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const TikTokScraper = __importStar(require("../src/index"));
const options_1 = require("./options");
const TARGET_USER = 'livshelby84662';
(async () => {
    try {
        const posts = await TikTokScraper.user(TARGET_USER, options_1.options);
        console.log(posts.collector);
    }
    catch (error) {
        console.log(error);
    }
})();

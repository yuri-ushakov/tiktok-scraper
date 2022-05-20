"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const TEMPLATES = [
    [`<script id="SIGI_STATE" type="application/json">`, `</script><script id="SIGI_RETRY"`],
    [`<script id="sigi-persisted-data">window['SIGI_STATE']=`, `;window['SIGI_RETRY']`],
];
const TEMPLATE_NEW = [`{"props":`, `</script>`];
function parseUserInfo(htmlResponse) {
    for (const template of TEMPLATES) {
        const found1 = htmlResponse.includes(template[0]);
        const found2 = htmlResponse.includes(template[1]);
        if (found1 && found2) {
            return JSON.parse(htmlResponse.split(template[0])[1].split(template[1])[0]);
        }
    }
    throw new Error(`Error parsing tiktok html-page with WebHtmlStateObject.`);
}
exports.parseUserInfo = parseUserInfo;
function parseUserInfoNew(htmlResponse) {
    const firstIdx = htmlResponse.indexOf(TEMPLATE_NEW[0]);
    if (firstIdx === null) {
        throw new Error(`Error parsing tiktok html-page with IAppProps`);
    }
    const firstPart = htmlResponse.substring(firstIdx);
    const secondIdx = htmlResponse.indexOf(TEMPLATE_NEW[1]);
    if (secondIdx === null) {
        throw new Error(`Error parsing tiktok html-page with IAppProps.`);
    }
    const arr = firstPart.split(TEMPLATE_NEW[1]);
    return JSON.parse(arr[0]);
}
exports.parseUserInfoNew = parseUserInfoNew;
function parseUserMetaData(username, htmlResponse) {
    fs.writeFileSync('response.html', htmlResponse);
    try {
        const appProps = parseUserInfoNew(htmlResponse);
        fs.writeFileSync('appprops.json', JSON.stringify(appProps));
        const userInfo = appProps.props.pageProps.userInfo.user;
        const userStats = appProps.props.pageProps.userInfo.stats;
        const userShareMeta = {
            title: '',
            desc: '',
        };
        return {
            user: userInfo,
            stats: userStats,
            shareMeta: userShareMeta,
        };
    }
    catch (e) {
        const htmlState = parseUserInfo(htmlResponse);
        fs.writeFileSync('htmlState.json', JSON.stringify(htmlState));
        const userInfo = htmlState.UserModule.users[username];
        const userStats = htmlState.UserModule.stats[username];
        const userShareMeta = {
            title: htmlState.SharingMeta.value['twitter:title'],
            desc: htmlState.SharingMeta.value['twitter:description'],
        };
        return {
            user: userInfo,
            stats: userStats,
            shareMeta: userShareMeta,
        };
    }
}
exports.parseUserMetaData = parseUserMetaData;

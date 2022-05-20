import { IAppProps, UserMetadata, UserProfileInfo, UserShareMetadata, UserStats, WebHtmlStateObject } from 'types/TikTokApi';
import * as fs from 'fs';

const TEMPLATES = [
    [`<script id="SIGI_STATE" type="application/json">`, `</script><script id="SIGI_RETRY"`],
    [`<script id="sigi-persisted-data">window['SIGI_STATE']=`, `;window['SIGI_RETRY']`],
];

const TEMPLATE_NEW = [`{"props":`, `</script>`];

export function parseUserInfo(htmlResponse: string): WebHtmlStateObject {
    for (const template of TEMPLATES) {
        const found1 = htmlResponse.includes(template[0]);
        const found2 = htmlResponse.includes(template[1]);
        if (found1 && found2) {
            return JSON.parse(htmlResponse.split(template[0])[1].split(template[1])[0]);
        }
    }
    throw new Error(`Error parsing tiktok html-page with WebHtmlStateObject.`);
}

export function parseUserInfoNew(htmlResponse: string): IAppProps {
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

export function parseUserMetaData(username: string, htmlResponse: string): UserMetadata {
    fs.writeFileSync('response.html', htmlResponse);

    try {
        const appProps: IAppProps = parseUserInfoNew(htmlResponse);
        fs.writeFileSync('appprops.json', JSON.stringify(appProps));
        const userInfo: UserProfileInfo = appProps.props.pageProps.userInfo.user;
        const userStats: UserStats = appProps.props.pageProps.userInfo.stats;
        const userShareMeta: UserShareMetadata = {
            title: '',
            desc: '',
            // title: htmlState.SharingMeta.value['twitter:title'],
            // desc: htmlState.SharingMeta.value['twitter:description'],
        };
        return {
            user: userInfo,
            stats: userStats,
            shareMeta: userShareMeta,
        };
    } catch (e) {
        const htmlState: WebHtmlStateObject = parseUserInfo(htmlResponse);
        fs.writeFileSync('htmlState.json', JSON.stringify(htmlState));
        const userInfo: UserProfileInfo = htmlState.UserModule.users[username];
        const userStats: UserStats = htmlState.UserModule.stats[username];
        const userShareMeta: UserShareMetadata = {
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

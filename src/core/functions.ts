import { IAppProps, WebHtmlStateObject } from 'types/TikTokApi';

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
        throw new Error(`Error parsing tiktok html-page with IAppProps`);
    }
    const arr = firstPart.split(TEMPLATE_NEW[1]);
    return JSON.parse(arr[0]);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TEMPLATES = [
    [`<script id="SIGI_STATE" type="application/json">`, `</script><script id="SIGI_RETRY"`],
    [`<script id="sigi-persisted-data">window['SIGI_STATE']=`, `;window['SIGI_RETRY']`],
];
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

import { IAppProps, UserMetadata, WebHtmlStateObject } from 'types/TikTokApi';
export declare function parseUserInfo(htmlResponse: string): WebHtmlStateObject;
export declare function parseUserInfoNew(htmlResponse: string): IAppProps;
export declare function parseUserMetaData(username: string, htmlResponse: string): UserMetadata;

export const options = {
    // Number of posts to scrape: {int default: 20}
    number: 50,

    // Scrape posts published since this date: { int default: 0}
    since: 0,

    // Set session: {string[] default: ['']}
    // Authenticated session cookie value is required to scrape user/trending/music/hashtag feed
    // You can put here any number of sessions, each request will select random session from the list
    sessionList: ['sid_tt=c8565c7282b86855d19bfdf4e475e498'],

    // Set proxy {string[] | string default: ''}
    // http proxy: 127.0.0.1:8080
    // socks proxy: socks5://127.0.0.1:8080
    // You can pass proxies as an array and scraper will randomly select a proxy from the array to execute the requests
    proxy: '5.61.56.223:21707',
    // proxy: '66.23.203.203:10793',
    // proxy: '',

    // Set to {true} to search by user id: {boolean default: false}
    by_user_id: false,

    // How many post should be downloaded asynchronously. Only if {download:true}: {int default: 5}
    asyncDownload: 5,

    // How many post should be scraped asynchronously: {int default: 3}
    // Current option will be applied only with current types: music and hashtag
    // With other types it is always 1 because every request response to the TikTok API is providing the "maxCursor" value
    // that is required to send the next request
    asyncScraping: 3,

    // File path where all files will be saved: {string default: 'CURRENT_DIR'}
    filepath: `CURRENT_DIR`,

    // Custom file name for the output files: {string default: ''}
    fileName: `CURRENT_DIR`,

    // Output with information can be saved to a CSV or JSON files: {string default: 'na'}
    // 'csv' to save in csv
    // 'json' to save in json
    // 'all' to save in json and csv
    // 'na' to skip this step
    filetype: `json`,

    // Set custom headers: user-agent, cookie and etc
    // NOTE: When you parse video feed or single video metadata then in return you will receive {headers} object
    // that was used to extract the information and in order to access and download video through received {videoUrl} value you need to use same headers
    headers: {
        'user-agent':
            '5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
        // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
        referer: 'https://www.tiktok.com/',
        cookie: `tt_webid_v2=68dssds`,
    },

    // Download video without the watermark: {boolean default: false}
    // Set to true to download without the watermark
    // This option will affect the execution speed
    noWaterMark: true,

    // Create link to HD video: {boolean default: false}
    // This option will only work if {noWaterMark} is set to {true}
    hdVideo: true,

    // verifyFp is used to verify the request and avoid captcha
    // When you are using proxy then there are high chances that the request will be
    // blocked with captcha
    // You can set your own verifyFp value or default(hardcoded) will be used
    verifyFp: '',

    // Switch main host to Tiktok test enpoint.
    // When your requests are blocked by captcha you can try to use Tiktok test endpoints.
    useTestEndpoints: false,
};

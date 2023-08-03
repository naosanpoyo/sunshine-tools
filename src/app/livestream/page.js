import './livestream.css';
import Script from 'next/script'

const Page = async () => {

    ///// Twitch /////

    function getTwitchAuthorization() {
        let url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

        return fetch(url, {
        method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    }

    function renderStreams(data) {
        let { data: streams } = data;

        const twitchStreams = [];
        let multiStreamUrl = 'https://multistre.am/';

        streams.forEach((stream) => {
            let { thumbnail_url: thumbnail, title, user_name, user_login } = stream;
            let hdThumbnail = thumbnail
                    .replace("{width}", "1280")
                    .replace("{height}", "720");
            let url = `https://www.twitch.tv/${user_login}`;
            twitchStreams.push(
                <div className="stream-container">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <img src={hdThumbnail} />
                            <h2>{title}</h2>
                            <p>{user_name}</p>
                        </a>
                </div>
            );
            multiStreamUrl += `${user_login}/`;
        })
        twitchStreams.push(
            <button className="multi-stream-button" type="button"><a href={multiStreamUrl} target="_blank" rel="noopener noreferrer">複窓する</a></button>
        )

        return (
            <div>
                <h1>Twitchで配信中 {streams.length}件</h1>
                <div className="streams">
                    {twitchStreams}
                </div>
            </div>
        );
    }

    async function getStreams() {
        const endpoint = `https://api.twitch.tv/helix/streams?game_id=${process.env.TWITCH_GAME_ID}`;

        let authorizationObject = await getTwitchAuthorization();
        let { access_token, expires_in, token_type } = authorizationObject;

        token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length);

        let authorization = `${token_type} ${access_token}`;

        let headers = {
        authorization,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
        };

        const res = await fetch(endpoint, { headers, next: { revalidate: 30 } });
        const data = await res.json();
        return renderStreams(data);
    }

    const twitchContainer = await getStreams();

    ///// YouTube /////

    const { key, query } = settings.youtube;
    let data = null;
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=10&key=${process.env.YOUTUBE_KEY}&q=${process.env.YOUTUBE_QUERY}`, { next: { revalidate: 30 } });
        data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }

    const { items = [] } = data;
    let youtubeStreams = [];

    if (items.length) {
        items.forEach (item => {
            const { videoId } = item.id;
            const { title, thumbnails, channelTitle } = item.snippet;
            youtubeStreams.push(
                <div className="stream-container">
                        <a href={`https://www.youtube.com/live/${videoId}`} target="_blank" rel="noopener noreferrer">
                            <img src={thumbnails.medium.url} />
                            <h2>${title}</h2>
                            <p>${channelTitle}</p>
                        </a>
                </div>
            )
        })
    }

    const youtubeContainer = 
        <div>
            <h1>YouTubeで配信中 {items.length}件</h1>
            <div className="streams">
                {youtubeStreams}
            </div>
        </div>;

    return (
        <div>
            {twitchContainer}
            <br /><br />
            {youtubeContainer}
            
        </div>
    )
}

export default Page;
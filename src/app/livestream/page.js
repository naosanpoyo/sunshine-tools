import './livestream.css';
import Script from 'next/script'

const Page = async () => {
    const settings = {
        twitch: {
            clientId: "e5ilv5ag1mc7uja1794dvrjq5sdeq4",
            clientSecret: "nqfih1mzempt52jljv2v0flo2z356v",
            gameId: "2692",
        },
        youtube: {
            key: "AIzaSyBKYQBlmrZ6M8pd6Btr-Ebecxru9h2cAok",
            query: "マリオサンシャイン",
        }
    };

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
            <div className="streams">
                {twitchStreams}
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

        const res = await fetch(endpoint, { headers });
        const data = await res.json();
        return renderStreams(data);
    }

    const twitchContainer = await getStreams();

    ///// YouTube /////

    const googleApiClientReady = function() {
        console.log("googleApiClientReady");
        gapi.auth.init(function() {
            window.setTimeout(checkAuth, 1);
        });
    }

    function checkAuth() {
        console.log("checkAuth");
        gapi.auth.authorize({
            client_id: OAUTH2_CLIENT_ID,
            scope: OAUTH2_SCOPES,
            immediate: true
        }, handleAuthResult);
    }

    function handleAuthResult(authResult) {
        console.log("handleAuthResult");
        if (authResult && !authResult.error) {
            // Authorization was successful. Hide authorization prompts and show
            // content that should be visible after authorization succeeds.
            $('.pre-auth').hide();
            $('.post-auth').show();
            loadAPIClientInterfaces();
        } else {
            // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
            // client flow. The current function is called when that flow completes.
            $('#login-link').click(function() {
                gapi.auth.authorize({
                client_id: OAUTH2_CLIENT_ID,
                scope: OAUTH2_SCOPES,
                immediate: false
                }, handleAuthResult);
            });
        }
    }

    function loadAPIClientInterfaces() {
        console.log("loadAPIClientInterfaces");
        gapi.client.load('youtube', 'v3', function() {
            handleAPILoaded();
        });
    }

    function handleAPILoaded() {
        console.log("handleAPILoaded");
        //$('#search-button').attr('disabled', false);
        search();
    }

    function search() {
        console.log("search");
        const { key, query } = settings.youtube;
        var request = gapi.client.youtube.search.list({
            q: query,
                key: key,
            part: 'snippet',
                eventType: 'live',
                type: 'video',
                maxResults: 50,
        });
      
        request.execute(function(response) {
            console.log(JSON.stringify(response.result));
            str = '';
            const { items } = response.result;
            if (items.length) {
                items.forEach (item => {
                    const { videoId } = item.id;
                    const { title, thumbnails, channelTitle } = item.snippet;
                    str += `
                    <div class="stream-container">
                        <a href=https://www.youtube.com/live/${videoId}" target="_blank" rel="noopener noreferrer">
                            <img src="${thumbnails.medium.url}" />
                            <h2>${title}</h2>
                            <p>${channelTitle}</p>
                        </a>
                </div>`;
                });
            }
            //$('#search-container').html(str);
        });
    }

    const { key, query } = settings.youtube;
    let data = null;
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=10&key=${process.env.YOUTUBE_KEY}&q=${process.env.YOUTUBE_QUERY}`);
        data = await res.json();
        console.log("test1");
        console.log(data);
        console.log("test2");
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
        <div className="streams">
            {youtubeStreams}
        </div>;

    return (
        <div>
            <h1>Twitchで配信中</h1>
            {twitchContainer}
            <br /><br />
            <h1>YouTubeで配信中</h1>
            {youtubeContainer}
            
        </div>
    )
}

export default Page;
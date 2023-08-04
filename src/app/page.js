import './livestream/livestream.css';

export default function Home() {
    return (
        <div>
            <h1>ツール一覧</h1>
            <div className="streams">
                <div className="stream-container">
                    <a href="https://sunshine-tools.vercel.app/livestream/sms" target="_blank" rel="noopener noreferrer">
                        <img src="live.png" />
                        <h2>サンシャイン配信一覧表示</h2>
                    </a>
                </div>
                <div className="stream-container">
                    <a href="https://naosanpoyo.github.io/PeteyPattern/" target="_blank" rel="noopener noreferrer">
                        <img src="petey.png" />
                        <h2>ボスパックンツール</h2>
                    </a>
                </div>
                <div className="stream-container">
                    <a href="https://docs.google.com/spreadsheets/d/1lDy6K2_pqafPnrAVaKtEVbAegrypd7Z7Y-rjhux_Plc/edit#gid=0" target="_blank" rel="noopener noreferrer">
                        <img src="pattern.png" />
                        <h2>ボスパックンパターン一覧</h2>
                    </a>
                </div>
                <div className="stream-container">
                    <a href="https://naosanpoyo.github.io/SunshineBingo/" target="_blank" rel="noopener noreferrer">
                        <img src="bingo.png" />
                        <h2>初心者用ビンゴ</h2>
                    </a>
                </div>
                <div className="stream-container">
                    <a href="https://naosanpoyo.github.io/BingoSeeds/" target="_blank" rel="noopener noreferrer">
                        <img src="seed.png" />
                        <h2>ビンゴシード厳選</h2>
                    </a>
                </div>
                <div className="stream-container">
                    <a href="https://naosanpoyo.github.io/SalmonRunCountDown/" target="_blank" rel="noopener noreferrer">
                        <img src="salmon.png" />
                        <h2>サーモンランカウントダウン</h2>
                    </a>
                </div>
            </div>
            <h1>記事一覧</h1>
            <ul>
                <li><a href="https://naosan-rta.hatenablog.com/entry/bingorule">スーパーマリオサンシャイン本家ビンゴルール</a></li>
                <li><a href="https://naosan-rta.hatenablog.com/entry/SunshineBingo2">第2回マリオサンシャインビンゴ大会</a></li>
                <li><a href="https://naosan-rta.hatenablog.com/entry/photocontest">マリオサンシャインフォトコンテスト</a></li>
                <li><a href="https://naosan-rta.hatenablog.com/entry/2022/02/27/113227">Twitchでレイドされたときに自動でお礼と宣伝をする方法</a></li>
                <li><a href="https://naosan-rta.hatenablog.com/entry/2022/02/24/201128">Nightbotでボスパックンのデレ度チェック</a></li>
                <li><a href="https://naosan-rta.hatenablog.com/entry/2022/01/01/142812">スーパーマリオサンシャイン新春謎解き2022</a></li>
                <li><a href="https://naosan-rta.hatenablog.com/entry/2021/12/21/193201">スーパーマリオサンシャイン用語(日本語&英語)</a></li>
                <li><a href="https://naosan-rta.hatenablog.com/entry/2021/06/30/231218">第12回スーパーマリオサンシャインRTA初心者大会</a></li>
                <li><a href="https://naosan-rta.hatenablog.com/entry/bingocontest">第1回スーパーマリオサンシャイン初心者用ビンゴ大会！</a></li>
            </ul>
        </div>
    )
}

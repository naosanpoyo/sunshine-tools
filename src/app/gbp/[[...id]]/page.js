import LineChart from '../line.js'

const Page = async (props) => {

    async function getData() {
        const response = await fetch(`https://bestdori.com/api/events/all.3.json`, { next: { revalidate: 3600 } });
        const resjson = await response.json();
        let latestEventId = 0;
        for (const key of Object.keys(resjson)) {
            if (latestEventId < Number(key) && 5000 > Number(key)) latestEventId = Number(key);
        }
        const eventId = props.params.id || latestEventId;
        const eventInfo = JSON.parse(JSON.stringify(resjson[eventId]));
        const eventName = eventInfo.eventName[0];
        const startDate = Number(eventInfo.startAt[0]);
        const endDate = Number(eventInfo.endAt[0]);

        const tiers = [100,500,1000,5000,10000,50000];
        const colors = ["rgba(255,0,0,1)", "rgba(0,255,0,1)", "rgba(0,0,255,1)", "rgba(255,255,0,1)", "rgba(255,0,255,1)", "rgba(0,255,255,1)"];
        const labels = [];
        const ep = [];
        const velocity = [];
        const datasets = [];
        const datasets2 = [];
        let lastUpdated = 0;
        for (let i=0; i<tiers.length; i++) {
            ep[i] = [];
            velocity[i] = [];
            const response = await fetch(`https://bestdori.com/api/tracker/data?server=JP&event=${eventId}&tier=${tiers[i]}`, { next: { revalidate: 600 } });
            const resjson = await response.json();
            resjson.cutoffs.forEach(function(value, index, values){
                if (index===0) {
                    if (i===0) labels.push(0);
                    if (i===0) labels.push(value.time-startDate);
                    ep[i].push(0);
                    ep[i].push(value.ep);
                    velocity[i].push(null);
                    velocity[i].push(value.ep/0.25);
                } else {
                    lastUpdated = value.time;
                    if (i===0) labels.push(value.time-startDate);
                    ep[i].push(value.ep);
                    if ((index%4===0 || index===values.length-1) && index>=4) {
                        velocity[i].push((values[index].ep-values[index-4].ep)/2);
                    } else if (index===2) {
                        velocity[i].push((values[index].ep-values[index-2].ep));
                    } else {
                        velocity[i].push(null);
                    }
                }
                if (index!==values.length-1) {
                    if (i===0) labels.push(value.time-startDate+900000);
                    ep[i].push(null);
                    velocity[i].push(null);
                }
            });
            datasets.push({
                label: `Tier ${tiers[i]}`,
                data: ep[i],
                borderColor: colors[i],
                backgroundColor: "rgba(0,0,0,0)",
                spanGaps: true
            });
            datasets2.push({
                label: `Tier ${tiers[i]}`,
                data: velocity[i],
                borderColor: colors[i],
                backgroundColor: "rgba(0,0,0,0)",
                spanGaps: true
            });
        }

        const data = {
            labels: labels,
            datasets: datasets,
        };
        const data2 = {
            labels: labels,
            datasets: datasets2,
        };
        return { 
            eventId,
            eventName,
            startDate,
            endDate,
            lastUpdated,
            data,
            data2
        };
    };

    function getDateString(unixtime) {
        const dateTime = new Date(unixtime);
        return dateTime.toLocaleDateString('ja-JP').slice(5) + ' ' + dateTime.toLocaleTimeString('ja-JP').slice(0,dateTime.toLocaleTimeString('ja-JP').length-3);
    }

    const { eventId, eventName, startDate, endDate, lastUpdated, data, data2 } = await getData();

    return (
        <div>
            <br /><br /><br /><br />
            <h1>{eventId} {eventName}</h1>
            <h2>イベント期間: {getDateString(startDate)} ~ {getDateString(endDate)}</h2>
            <h3>最終更新: {getDateString(lastUpdated)}</h3>
            <LineChart data={data} startDate={startDate} endDate={endDate+1000} />
            <LineChart data={data2} startDate={startDate} endDate={endDate+1000} />
            <br /><br /><br /><br />
            このページは<a href="https://bestdori.com/" target="_blank" rel="noopener noreferrer">Bestdori</a>のAPIを利用しています。
        </div>
    )
}

export default Page;
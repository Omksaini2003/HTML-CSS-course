
        //console.log('about to fetch a rainbow');
        //catchRainbow();
        async function catchRainbow(){
            const response = await fetch('rainbow.jfif');
            const blob = await response.blob();
            document.getElementById('rainbow').src = URL.createObjectURL(blob);
        }

//        fetch('rainbow.jpeg')
//        .then(response => {
//            console.log(response);
//            return response.blob();
//        })
//        .then(blob => {
//            console.log(blob);
//            document.getElementById('rainbow').src = URL.createObjectURL(blob);
//        })
//        .catch(error => {
//            console.log('error !!');
//            console.error(error);
//        });


  
   
    //chartIt();

async function chartIt()
{
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface water temperature in C',
                data: data.ys,
                fill: false,
                backgroundColor: ['rgba(255,0.2,0.2,0.2'],
                borderWidth:1
            }]
        }
    })
}

async function getData()
{
    const xs=[];
    const ys=[];

    const response = await fetch('database2.csv');
    const data = await response.text();
    //console.log(data);

    //const rows = data.split('\n');
    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const columns = row.split(',');

        const year = columns[0];
        xs.push(year);
        
        const temp = columns[1];
        ys.push(parseFloat(temp)+14); //mean temp = 14
        
        console.log(year,temp);
    });
    return {xs,ys};
    //console.log(rows);
}

/////////

let flag= true;
        //making a map and tile
        const map = L.map('map').setView([0,0], 1);
        
        const attribution  = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
        const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl, { attribution});
        
        tiles.addTo(map);

        const api_url= 'https://api.wheretheiss.at/v1/satellites/25544'

        //making marker
        const marker = L.marker([0,0]).addTo(map);

        async function getISS()
        {
            const response = await fetch(api_url)
            const data = await response.json();
            
            const {latitude, longitude} = data; 
            
            document.getElementById('lat').textContent= latitude.toFixed(2);
            document.getElementById('lon').textContent= longitude.toFixed(2);

            //L.marker([latitude,longitude]).addTo(map);
            
            marker.setLatLng([latitude, longitude]);

            if(flag){
            map.setView([latitude,longitude],1);
            flag=false;
            }
            //const map = L.map('map').setView([latitude, longitude], 13);

            console.log(latitude);
            console.log(longitude);
        }

        getISS();

        setInterval(getISS, 1000);
        

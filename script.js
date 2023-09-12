const myAuthorization = 'CWB-75625081-4569-4414-93FD-FC371A92BAA4';
const currentDate = new Date();
const hours = currentDate.getHours();
//console.log(hours);
async function getTownAnd12hr() {
    try {
        let res = null;
        res = await axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-007?Authorization=${myAuthorization}&elementName=MinT,MaxT,PoP12h,WeatherDescription`);
        // console.log(res.data.records.locations[0].location);
        return res.data.records.locations[0].location;
    } catch (e) {
        console.log('ERROR', e);
    }
}

const selectTown = document.querySelector('#selectTown');
let townNameArr = null;
let townName = null;
async function myRequest() {
    townNameArr = await getTownAnd12hr();
    townName = townNameArr.map(x => x.locationName)
    //console.log(data)
    // console.log(townName);
    townName.forEach(element => {
        // console.log(element);
        const newOption = document.createElement('option');
        newOption.innerText = element;
        selectTown.append(newOption);
    });

    // console.log(a);
}
myRequest();


const requestBut = document.querySelector('#requestBut');
requestBut.addEventListener('click', () => {

    //style.transition = 'opacity 1s ease-in-out';
    for (let i = 1; i <= 3; i++) {
        const removeData = document.querySelector(`#display${i}`);
        removeData.innerHTML = '';
    }

    const selectTownName = selectTown.value;
    console.log(selectTownName);


    //console.log(myH1.innerText);
    //console.log(townName);
    const selectedIndex = townName.indexOf(selectTownName);
    console.log(selectedIndex);

    // console.log(townNameArr[0].weatherElement[0].time[0].startTime);
    // console.log(townNameArr[0].weatherElement[0].time[0].endTime);
    //console.log(townNameArr[0].weatherElement[3].time[0].elementValue[0]);

    const storeStartTime = [];
    const storeEndTime = [];
    const storePoP12 = [];
    const storeMinT = [];
    const storeMaxT = [];
    for (let i = 0; i < 3; i++) {
        storeStartTime.push(townNameArr[selectedIndex].weatherElement[0].time[i].startTime);
        storeEndTime.push(townNameArr[selectedIndex].weatherElement[0].time[i].endTime);
        storePoP12.push(townNameArr[selectedIndex].weatherElement[0].time[i].elementValue[0].value);
        storeMinT.push(townNameArr[selectedIndex].weatherElement[1].time[i].elementValue[0].value);
        storeMaxT.push(townNameArr[selectedIndex].weatherElement[3].time[i].elementValue[0].value);
    }
    const myH1 = document.querySelector('h1');
    const todayDate = storeStartTime[0];
    myH1.innerText = `${todayDate}${selectTownName}`;

    for (let i = 0; i < 3; i++) {
        storeStartTime[i] = storeStartTime[i].slice(11, 16);
        storeEndTime[i] = storeEndTime[i].slice(11, 16);
    }

    let display1, display2, display3 = null;
    if (hours >= 0 && hours < 6) {
        display1 = '今日凌晨';
        display2 = '今日白天';
        display3 = '今日晚上';
    }
    else if (hours >= 6 && hours < 12) {
        display1 = '今日白天';
        display2 = '今晚明晨';
        display3 = '明日白天';
    }
    else if (hours >= 12 && hours < 18) {
        display1 = '今日白天';
        display2 = '今晚明晨';
        display3 = '明日白天';
    }
    else if (hours >= 18 && hours < 24) {
        display1 = '今晚明晨';
        display2 = '明日白天';
        display3 = '明日晚上';
    }

    const sunOrMoon1 = document.querySelector('#display1');
    const dataInfo1 = document.createElement('p');
    dataInfo1.classList.add('sunormoon');
    dataInfo1.innerText = display1;
    sunOrMoon1.append(dataInfo1);
    //  console.log(sunOrMoon1);

    const sunOrMoon2 = document.querySelector('#display2');
    const dataInfo2 = document.createElement('p');
    dataInfo2.classList.add('sunormoon');
    dataInfo2.innerText = display2;
    sunOrMoon2.append(dataInfo2);

    const sunOrMoon3 = document.querySelector('#display3');
    const dataInfo3 = document.createElement('p');
    dataInfo3.classList.add('sunormoon');
    dataInfo3.innerText = display3;
    sunOrMoon3.append(dataInfo3);





    console.log(storeStartTime, storeEndTime, storePoP12, storeMinT, storeMaxT);


    for (let i = 0; i < 3; i++) {
        const startTime = storeStartTime[i];
        const endTime = storeEndTime[i];
        const dataInfo1 = document.createElement('p');
        dataInfo1.innerText = `${startTime}~${endTime}`;
        const query = document.querySelector(`#display${i + 1}`);
        query.append(dataInfo1);

        const minT = storeMinT[i];
        const maxT = storeMaxT[i];
        const dataInfo2 = document.createElement('p');
        dataInfo2.classList.add('minTmaxT');
        dataInfo2.innerText = `${minT}°C~${maxT}°C`;
        query.append(dataInfo2);

        const pop12 = storePoP12[i];
        const pop12Div = document.createElement('div');
        pop12Div.classList.add('pop12');
        const rainIcon = document.createElement("i");
        rainIcon.className = 'bi bi-cloud-rain-fill';
        const dataInfo3 = document.createElement('p');
        dataInfo3.innerText = `${pop12}%`;
        pop12Div.append(rainIcon);
        pop12Div.append(dataInfo3);
        query.append(pop12Div);
        // dataInfo3.innerText = `${<i class="bi bi-cloud-rain"></i>}`;
    }

    const sunOrMoonani = document.querySelectorAll('p');
    const iconAni = document.querySelectorAll('i');
    setTimeout(function () {
        sunOrMoonani.forEach(element => {
            element.style.opacity = 1;
        })
        iconAni.forEach(element => {
            element.style.opacity = 1;
        })
    }, 1);
})





//CWB-75625081-4569-4414-93FD-FC371A92BAA4
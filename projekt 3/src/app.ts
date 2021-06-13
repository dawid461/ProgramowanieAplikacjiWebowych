export class App {

    Main() {
        console.log(localStorage)
        this.container();
        this.createInput();
        this.searchInput();
        this.containerWeatherbox()
        for (let i = 1; i < localStorage.length; i++) {
            this.createWeatherBox(`id_${i}`);
            console.log(`id_${i}`)
            console.log(localStorage.length)
        }
    }



    container() {
        const container: HTMLElement = document.createElement("div");
        container.className = "container";
        container.id = "container";
        document.body.appendChild(container);
    }
    containerWeatherbox() {
        const containerWeatherBoxes: HTMLElement = document.createElement("div");
        containerWeatherBoxes.className = "containerWeatherBoxes";
        containerWeatherBoxes.id = "containerWeatherBoxes";
        document.body.appendChild(containerWeatherBoxes);
    }
    searchInput() {
        const searchInput: HTMLInputElement = document.createElement("input");
        const containerBOx: any = document.getElementById("container")
        searchInput.className = "searchInput";
        searchInput.type = "button"
        searchInput.value = "wyszukaj";
        searchInput.addEventListener("click", this.getName.bind(this));
        containerBOx.appendChild(searchInput);
    }
    createInput() {
        const input: HTMLInputElement = document.createElement("input");
        const containerBOx: any = document.getElementById("container")
        input.className = "inputText";
        input.id = "inputText";
        input.placeholder = "Podaj nazwę miasta";
        containerBOx.appendChild(input)
    }
    //-------------------------------------------------------------------------

    counter: number = localStorage.length > 2 ? localStorage.length - 1 : 0;
    //--------------pobieranie----nazwy---miejsca---które----------szukamy
    getName(): any {
        var townValue: any = document.getElementById("inputText");
        if (townValue.value !== "")
            this.getInfoCity(townValue.value).then(() => (this.createWeatherBox(`id_${this.counter}`)));
        else alert("nie podano nazwy miasta");
        townValue.value = "";
        this.counter++;

        console.log(localStorage)
    }
    createWeatherBox(dataName: string) {
        const containerBoxW: any = document.getElementById("containerWeatherBoxes")

        let data: any = localStorage.getItem(dataName);
        data = JSON.parse(data)

        const elementsDiv: HTMLElement = document.createElement("div");
        const temperature: HTMLElement = document.createElement("div");
        const clouds: HTMLElement = document.createElement("div");
        const info: HTMLElement = document.createElement("div");
        const moreinfo: HTMLElement = document.createElement("div");
        elementsDiv.className = "elementsDiv";
        temperature.className = "temperature";
        clouds.className = "clouds";
        info.className = "info";
        moreinfo.className = "moreinfo";

        elementsDiv.innerHTML = data.name;
        temperature.innerHTML = `${Math.floor(data.main.temp)} °C`;
        clouds.innerHTML = data.weather[0].main;
        info.innerHTML = `Więcej Info`;
        info.addEventListener("click", showMore);
        moreinfo.innerHTML = `
        <ul>
         <li> feels like: ${data.main.feels_like}</li> 
         <li> temp min: ${data.main.temp_min}</li> 
         <li> temp max: ${data.main.temp_max}</li> 
         <li> wind speed: ${data.wind.speed}</li>    
        </ul>
        `;

        elementsDiv.appendChild(temperature);
        elementsDiv.appendChild(clouds);
        elementsDiv.appendChild(info);
        elementsDiv.appendChild(moreinfo);
        containerBoxW.appendChild(elementsDiv);
        //-----------akcja----do---przycisku--,,wiecej info"------------
        function showMore() {
            if (moreinfo.style.display !== "none") {
                moreinfo.style.display = "none";
            } else {
                moreinfo.style.display = "block";
            }

        }
    }
    //-----------klucz---API------------------------------------
    apiKey = 'cbd469f4d255f18c43cb86d5abd769bb';

    constructor() {
    }

    async getInfoCity(city: string) {
        const weather = await this.getWeather(city);
        this.storageData(`id_${this.counter}`, weather);
    }
    async getWeather(city: string): Promise<any> {
        const apiWeather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`;
        const weatherAnswer = await fetch(apiWeather);
        const weatherData = await weatherAnswer.json();
        return weatherData;
    }

    storageData(saveName: string, data: any) {
        localStorage.setItem(saveName, JSON.stringify(data));
    }

}




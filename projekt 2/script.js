class DrumAll {
    constructor() {
        this.sounds = [];
        document.querySelectorAll('audio').forEach((el) => {
            this.sounds.push(el);
        });
        console.log(this.sounds);
        new DrumAllUI(this.sounds);
    }
}
const CHANELS_COUNT = 4;
class DrumAllUI {
    constructor(sounds) {
        this.statsSection = document.getElementById('UI-section');
        this.chanels = [[]];
        this.sounds = [];
        this.soundButtons = [];
        this.chanelsDOMElements = [];
        this.activeChanel = null;
        
        this.sounds = sounds.map((element) => ({
            element,
            key: element.dataset.key
        }));
        document.body.addEventListener('keypress', (ev) => this.onKeyDown(ev));
        this.createButtons(sounds);
        this.createChanels();
    }
    createButtons(sounds) {
        const container = document.getElementById('buttons');
        // tworzenie przyciskow
        sounds.forEach(element => {
            const soundBtn = document.createElement('button');
            soundBtn.innerText = `${element.dataset.key}`;
            // przypisanie klucza do przycisku aby rozpoznać który jest który
            soundBtn.dataset.soundKey = element.dataset.key;
            // osobne zdarzenia dla przycisku
            soundBtn.addEventListener('click', (ev) => this.onClick(element.dataset.key, ev));
            // zapisywanie przycisku w klasie
            this.soundButtons.push(soundBtn);
            container.appendChild(soundBtn);
        });
    }
   
    onKeyDown(ev) {
        const key = ev.key;
        const time = ev.timeStamp;
        if (this.activeChanel !== null) {
            this.chanels[this.activeChanel].push({
                key: key,
                time: time
            });
        }
        console.log(this.chanels);
        this.playDrum(key);
    }

    onClick(key, ev) {
        const time = ev.timeStamp;
        if (this.activeChanel !== null) {
            this.chanels[this.activeChanel].push({
                key: key,
                time: time
            });
        }
        this.playDrum(key);
    }

    playDrum(key = null) {
        
        if (key) {
            const btn = this.soundButtons.find((el) => el.dataset.soundKey === key);
            const element = this.sounds.find((v) => v.key === key).element;
            element.currentTime = 0;
            element.play();
            
        }
    }
   
    createChanels() {
        const container = document.getElementById('chanels');
        for (let i = 0; i < CHANELS_COUNT; i++) {
            const chanelContainer = document.createElement('div');
            chanelContainer.classList.add("chanelContainer");
            // przycisk 
            const recordBtn = document.createElement('button');
            recordBtn.className = `recordBtn`;
            recordBtn.addEventListener('click', (ev) => this.activateChanel(i, ev));
            chanelContainer.appendChild(recordBtn);
            // przycisk 
            const playBtn = document.createElement('button');
            playBtn.className = `playBtn`;
            playBtn.disabled = true;
            const s = playBtn.addEventListener('click', (ev) => this.onPlayStopChanel(i));
            chanelContainer.appendChild(playBtn);
            // pasek nagrywania
            const progressBarContainer = document.createElement('div');
            progressBarContainer.className = `progressBar`;
            const progressBar = document.createElement('span');
            progressBar.addEventListener('animationend', () => {
                progressBar.style.animation = null;
                this.chanelsDOMElements[i].playBtn.disabled = false;
            });
            progressBarContainer.appendChild(progressBar);
            chanelContainer.appendChild(progressBarContainer);
            this.chanelsDOMElements.push({
                playBtn,
                recordBtn,
                progressBar
            });
            container.appendChild(chanelContainer);
        }
    }
    activateChanel(chanelIndex, event) {
        // to zdarzenie kliknięcia określa czas nagrywania
       this.chanels[chanelIndex] = [{
               time: event.timeStamp,
                key: null
            }];
        this.activeChanel = chanelIndex;
        this.chanelsDOMElements.forEach(el => {
            el.recordBtn.disabled = true;
        });
        this.chanelsDOMElements[chanelIndex].playBtn.disabled = false;
        this.chanelsDOMElements[chanelIndex].playBtn.classList.add('stopBtn');
    }
    onPlayStopChanel(chanelIndex) {
        if (this.activeChanel === chanelIndex) {
            this.stopRecording(chanelIndex);
        }
        else {           
            const chanel = this.chanels[chanelIndex];
            let prevTime = chanel[0].time;
            this.initPlayingBehavior(chanelIndex);
            chanel.forEach((sound) => {
                const time = sound.time - prevTime;
                setTimeout(() => {
                    this.playDrum(sound.key);
                }, time);
            });
        }
    }

    
    initPlayingBehavior(chanelIndex) {
        this.chanelsDOMElements[chanelIndex].playBtn.disabled = true;
        const chanel = this.chanels[chanelIndex];
        let prevTime = chanel[0].time;
        const recordingTime = `${(chanel[chanel.length - 1].time - prevTime).toFixed()}ms`;
     
    }

    stopRecording(chanelIndex) {
        this.chanelsDOMElements[chanelIndex].playBtn.classList.remove('stopBtn');
        const chanel = this.chanels[chanelIndex];
        const recordingTime = chanel[chanel.length - 1].time - chanel[0].time;
        this.chanelsDOMElements[chanelIndex].progressBar.parentElement.querySelectorAll('time').forEach(v => v.remove());
        this.chanelsDOMElements.forEach(el => {
            el.recordBtn.disabled = false;
        });
  
        this.activeChanel = null;
    }
}
const drumkit = new DrumAll();

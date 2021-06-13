class InputDataApp {
    inputValues: Array<number> = [];
    countNumber: number = 1;
    constructor() {
        const countInput: HTMLElement = document.getElementById('inputs-count');
        countInput.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            this.countNumber = Number(target.value);
            new UI(this.countNumber, this.inputValues);
        });
        new UI(this.countNumber, this.inputValues);
    }
}

class InputDataNumber {
    input: HTMLInputElement;
    button: HTMLButtonElement;
    constructor(id, count, values: Array<number>) {
        // create input
        this.input = document.createElement('input');
        this.input.type = "number";
        this.input.value = values[id] ? String(values[id]) : '0';
        this.input.id = `input-${id}`;
        values[id] = Number(this.input.value);
        this.input.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            values[id] = Number(target.value);
            new UI(count, values);
        });
        // delete input with data
        this.button = document.createElement('button');
        this.button.innerText = "X";
        this.button.addEventListener('click', (event: Event) => {
            const countInput: HTMLInputElement = document.getElementById('inputs-count') as HTMLInputElement;
            console.log(values);
            values[id] = 0;
            values.splice(id,1);
            count -= 1;
            countInput.value = count;
            console.log({count});

            new UI(count, values);
        });

    }
   //create div with input
    render() : HTMLDivElement {
        const container = document.createElement('div');
        container.className = "input-container";
        container.appendChild(this.input);
        container.appendChild(this.button);

        return container;
    }
}




class Stats {
    sum(values: Array<number>): number {
        const sum: number = values.reduce((a, b) => a + b, 0);
        return sum;
    }
    avg(values: Array<number>): number {
        const sum: number = values.reduce((a, b) => a + b, 0);
        return Number((sum / values.length).toFixed(2));
    }
    min(values: Array<number>): number {
        return Math.min(...values);
    }
    max(values: Array<number>): number {
        return Math.max(...values);
    }
}


class UI {
    statsSection = document.getElementById('UI-section');
    constructor(inputCount: number, values: Array<number>) {
        this.statsSection.innerHTML = null;
        if (this.validateData(inputCount, values)) {
            this.showUI(inputCount, values);
        } else {
            const inputsSection = document.getElementById('inputs');
            inputsSection.innerHTML = null;
            this.showErrorUI();
        }
    }

    validateData(inputCount: number, values: Array<number>): boolean {
        let isValid = false;
        console.log(inputCount);
        if (values && inputCount > 0) {
            isValid = values.every((val) => typeof val === 'number');
        }

        return isValid;
    }

    showStat(name: string, calcMethod: Function, values: Array<number>): HTMLDivElement {
        const statName = document.createElement('p');
        const value = document.createElement('b');
        statName.innerText = name;
        value.innerText = calcMethod(values);

        const container = document.createElement('div');
        container.appendChild(statName);
        container.appendChild(value);

        return container;
    }
    showNumberData(count: number, values: Array<number>): void{
        const inputsSection = document.getElementById('inputs');
        inputsSection.innerHTML = null;
        for (let i = 0; i < count; i++) {
            const input = new InputDataNumber(i,count, values).render();
            inputsSection.appendChild(input);
        }
    }
    showUI(inputCount: number, values: Array<number>): void {
        const stats = new Stats;
        const sections: Array<HTMLDivElement> = [];
        this.showNumberData(inputCount, values);
        const valuesToCount = values.slice(0, inputCount);
        sections.push(this.showStat('Sum', stats.sum, valuesToCount));
        sections.push(this.showStat('Average', stats.avg, valuesToCount));
        sections.push(this.showStat('Min', stats.min, valuesToCount));
        sections.push(this.showStat('Max', stats.max, valuesToCount));

        sections.forEach((el: HTMLDivElement) => {
            this.statsSection.appendChild(el);
        })
    }

    showErrorUI(): void {
        const invalidMsg = document.createElement('h1');
        invalidMsg.innerText = "Podano pustą wartość!";
        this.statsSection.appendChild(invalidMsg);
    }
}


const DataApp = new InputDataApp();
var InputDataApp = (function () {
    function InputDataApp() {
        var _this = this;
        this.inputValues = [];
        this.countNumber = 1;
        var countInput = document.getElementById('inputs-count');
        countInput.addEventListener('input', function (event) {
            var target = event.target, as = HTMLInputElement;
            _this.countNumber = Number(target.value);
            new UI(_this.countNumber, _this.inputValues);
        });
        new UI(this.countNumber, this.inputValues);
    }
    return InputDataApp;
})();

var InputDataNumber = (function () {
    function InputDataNumber(id, count, values) {
        // create input for data
        this.input = document.createElement('input');
        this.input.type = "number";
        this.input.value = values[id] ? String(values[id]) : '0';
        this.input.id = "input-" + id;
        values[id] = Number(this.input.value);
        this.input.addEventListener('input', function (event) {
            var target = event.target, as = HTMLInputElement;
            values[id] = Number(target.value);
            new UI(count, values);
        });
        // delete input with data
        this.button = document.createElement('button');
        this.button.innerText = "Usuń";
        this.button.addEventListener('click', function (event) {
            var countInput = document.getElementById('inputs-count'), as = HTMLInputElement;
            console.log(values);
            values[id] = 0;
            values.splice(id, 1);
            count -= 1;
            countInput.value = count;
            console.log({ count: count });
            new UI(count, values);
        });
    }
    //create div with input
    InputDataNumber.prototype.render = function () {
        var container = document.createElement('div');
        container.className = "input-container";
        container.appendChild(this.input);
        container.appendChild(this.button);
        return container;
    };
    return InputDataNumber;
})();


var Stats = (function () {
    function Stats() {
    }
    Stats.prototype.sum = function (values) {
        var sum = values.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    };
    Stats.prototype.avg = function (values) {
        var sum = values.reduce(function (a, b) { return a + b; }, 0);
        return Number((sum / values.length).toFixed(2));
    };
    Stats.prototype.min = function (values) {
        return Math.min.apply(Math, values);
    };
    Stats.prototype.max = function (values) {
        return Math.max.apply(Math, values);
    };
    return Stats;
})();


var UI = (function () {
    function UI(inputCount, values) {
        this.statsSection = document.getElementById('UI-section');
        this.statsSection.innerHTML = null;
        if (this.validateData(inputCount, values)) {
            this.showUI(inputCount, values);
        }
        else {
            var inputsSection = document.getElementById('inputs');
            inputsSection.innerHTML = null;
            this.showErrorUI();
        }
    }
    UI.prototype.validateData = function (inputCount, values) {
        var isValid = false;
        console.log(inputCount);
        if (values && inputCount > 0) {
            isValid = values.every(function (val) { return typeof val === 'number'; });
        }
        return isValid;
    };
    UI.prototype.showStat = function (name, calcMethod, values) {
        var statName = document.createElement('p');
        var value = document.createElement('b');
        statName.innerText = name;
        value.innerText = calcMethod(values);
        var container = document.createElement('div');
        container.appendChild(statName);
        container.appendChild(value);
        return container;
    };
    UI.prototype.showNumberData = function (count, values) {
        var inputsSection = document.getElementById('inputs');
        inputsSection.innerHTML = null;
        for (var i = 0; i < count; i++) {
            var input = new InputDataNumber(i, count, values).render();
            inputsSection.appendChild(input);
        }
    };
    UI.prototype.showUI = function (inputCount, values) {
        var _this = this;
        var stats = new Stats;
        var sections = [];
        this.showNumberData(inputCount, values);
        var valuesToCount = values.slice(0, inputCount);
        sections.push(this.showStat('Suma', stats.sum, valuesToCount));
        sections.push(this.showStat('Średnia', stats.avg, valuesToCount));
        sections.push(this.showStat('Wartość Min', stats.min, valuesToCount));
        sections.push(this.showStat('Wartość Max', stats.max, valuesToCount));
        sections.forEach(function (el) {
            _this.statsSection.appendChild(el);
        });
    };
    UI.prototype.showErrorUI = function () {
        var invalidMsg = document.createElement('h1');
        invalidMsg.innerText = "Podano pustą wartość!";
        this.statsSection.appendChild(invalidMsg);
    };
    return UI;
})();


var DataApp = new InputDataApp();

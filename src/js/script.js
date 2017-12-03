"use strict";

class Calculator {
    constructor(component){
        this.component = component;
        this.inputSum = component.querySelector('input[name="sum"]') || {};
        this.inputDateDocument = component.querySelector('input[name="dateDocument"]') || {};
        this.inputDateReal = component.querySelector('input[name="dateReal"]') || {};
        this.spanError = component.querySelector('div.error') || {};
        this.spanResult = component.querySelector('.result div') || {};
        this.buttonCalc = component.querySelector('button.calc') || {};

        this.buttonCalc.onclick = () => this.calc();
    }

    calc(){
        this.errorMessage();

        let sum = this.inputSum.value;
        if (!sum) return this.errorMessage('Ведите сумму договора');

        let dateDocument =
            (this.inputDateDocument.value && new Date(this.inputDateDocument.value).getTime()) || null;
        if (!dateDocument) return this.errorMessage('Ведите дату сдачи по договору');

        let dateReal =
            ((this.inputDateReal.value && new Date(this.inputDateReal.value)) || new Date()).getTime();

        let difference = dateReal - dateDocument;
        if (difference < 0) return this.errorMessage('Фактическая дата меньше даты сдачи по договору');

        difference = Math.ceil(difference / (1000 * 60 * 60 * 24));
        let result = (sum * difference * 0.00066);
        if (isNaN(result)) return this.errorMessage('Проверьте корректность ввода данных');

        this.spanResult.innerText = `Расчетная сумма неустойки: ${result.toFixed(2)} руб.`;

    }

    errorMessage(text){
        this.spanError.innerText = text || '';
    }

    static get entities(){
        return Calculator.prototype.entities;
    }

    static init(){
        Calculator.prototype.entities =
            [].map.call(document.querySelectorAll('.calculator'), (element) => new Calculator(element));

    }

}

Calculator.init();

const sr = ScrollReveal();

sr.reveal('.row');

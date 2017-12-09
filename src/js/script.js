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

class Sender{
    constructor(component){
        this.component = component;
        this.buttonSend = component.querySelector('button') || {};
        this.inputName = component.querySelector('input[name="name"]') || {};
        this.inputPhone = component.querySelector('input[name="tel"]') || {};
        this.divError = component.querySelector('.error') || {};

        this.buttonSend.onclick = () => this.process();

    }

    get values(){
        return {
            name: this.inputName.value,
            phone: this.inputPhone.value
        }
    }

    process(){
        this.errorMessage();
        if (!this.validate()) return this.errorMessage('Пожалуйста, проверьте правильность введенных данных');

        Preloader.show();
        $.post('php/messenger.php', this.values, (data) => {

            console.log(data);
            Preloader.hide();
            this.complete();
        });
    }

    complete(){
        Sender.prototype.entities.forEach((entity) => {
            entity.buttonSend.innerText = 'Отправлено!';
            entity.buttonSend.setAttribute('disabled', 'disabled');
        })
    }

    validate(){
        return !!this.values.name
            && this.values.phone
            && /\d{10,11}/.test(this.values.phone.replace(/\+|-|\(|\)|\s/g, ''));
    }

    errorMessage(text){
        this.divError.innerText = text || '';
    }

    static init(){
        Sender.prototype.entities =
            [].map.call(document.querySelectorAll('.contacts'), (element) => new Sender(element));
    }
}

Sender.init();

class BigSender extends Sender {
    constructor(component){
        super(component);
        this.inputMail = component.querySelector('input[name="mail"]') || {};
        this.inputMessage = component.querySelector('textarea') || {};
    }

    get values(){
        let result = super.values;
        result.mail = this.inputMail.value;
        result.message = this.inputMessage.value;
        return result;
    }

    validate(){
        return !!this.values.name
            && (this.values.phone || this.values.mail)
            && this.values.message;
    }

    complete(){
        super.complete();
        BigSender.prototype.entities.forEach((entity) => {
            entity.buttonSend.innerText = 'Отправлено!';
            entity.buttonSend.setAttribute('disabled', 'disabled');
        })
    }

    static init(){
        BigSender.prototype.entities =
            [].map.call(document.querySelectorAll('.contacts-max'), (element) => new BigSender(element));
    }
}

BigSender.init();

class Preloader{
    static get preloader() {
        return $('#preloader');
    }

    static show(){
        Preloader.preloader.removeClass('hidden');
    }

    static hide(){
        Preloader.preloader.find('.fa').addClass('hidden');
        Preloader.preloader.find('.thanks').removeClass('hidden');
        setTimeout(()=> {
            Preloader.preloader.animate({opacity: 0}, 1000)
                .addClass('hidden')
                .css({opacity: 1})
        }, 40000);

    }
}



const sr = ScrollReveal();
sr.reveal('.row');

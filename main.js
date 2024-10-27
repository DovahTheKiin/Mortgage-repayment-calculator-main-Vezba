const calculateBtn = document.querySelector(".calculate-btn")
const noResults = document.querySelector(".no-results")
const resultsShow = document.querySelector(".results-show")

const ammount = document.querySelector(".ammount")
const term = document.querySelector(".term")
const interestRate = document.querySelector(".interest-rate")

const monthlyRepayment = document.querySelector(".repayment-number")
const repaymentNumber = document.querySelector(".total-number")
const monthlyRepaymentNumber = document.querySelector(".monthly-repayment")
const totalPaymentNumber = document.querySelector(".total-payment-number")

const radioButtons = document.getElementsByName("type")
const inputElements = document.getElementsByName("input")

const errorSpan = document.querySelectorAll(".error");
const currency = document.querySelector(".currency")
const years = document.querySelector(".years")
const percent = document.querySelector(".percent")

const clearAllBtn = document.querySelector(".clear-all-btn")

let counter = 0;
let counterSecond = 0;
let counterThird = 0;

radioButtonCheck();
calculateBtn.addEventListener("click", () => {
    if(ammount.value === "") {
        errorSpan[0].classList.remove("hidden");
        ammount.classList.add("border-error");
        currency.classList.add("bg-error");
        counter = 1;
    } else if (ammount.value != "") {
        errorSpan[0].classList.add("hidden");
        ammount.classList.remove("border-error");
        currency.classList.remove("bg-error");
        counter = 0; 
    }
    if(term.value === "") {
        errorSpan[1].classList.remove("hidden");
        term.classList.add("border-error");
        years.classList.add("bg-error");
        counterSecond = 1;
    } else if(term.value != "") {
        errorSpan[1].classList.add("hidden");
        term.classList.remove("border-error");
        years.classList.remove("bg-error");
        counterSecond = 0;
    }
    if(interestRate.value === "") {
        errorSpan[2].classList.remove("hidden");
        interestRate.classList.add("border-error");
        percent.classList.add("bg-error");
        counterThird = 1;
    } else if(interestRate.value != "") {
        errorSpan[2].classList.add("hidden");
        interestRate.classList.remove("border-error");
        percent.classList.remove("bg-error");
        counterThird = 0;
    }
    if(counter === 1 || counterSecond === 1 || counterThird === 1) {
        return;
    } else if(counter === 0 && counterSecond === 0 && counterThird === 0) {
        noResults.classList.add("hidden")
        resultsShow.classList.remove("hidden");
        if(radioButtons[0].checked) {
            let interestRateNumber = Number(interestRate.value);
            let mortgageAmmount = ammount.value;
            let mortgageAmmountNumber = parseInt(mortgageAmmount.replace(/,/g, ''));
            let monthlyInterestRate = Number(interestRateNumber/100/12);
            let numberOfMonths = Number(term.value*12);

            let finalResult = Number((mortgageAmmountNumber*monthlyInterestRate*Math.pow(1+monthlyInterestRate, numberOfMonths))/(Math.pow(1+monthlyInterestRate, numberOfMonths) - 1))
            let finalResultsDecimal = Number(finalResult.toFixed(2));
            let finalResultsLocale = finalResultsDecimal.toLocaleString('en');

            monthlyRepaymentNumber.innerText = finalResultsLocale;

            let totalNumber = Number(finalResultsDecimal*12*Number(term.value)).toFixed(2);

            totalPaymentNumber.innerText = Number(totalNumber).toLocaleString('en', { minimumFractionDigits: 2 });
        } else if(radioButtons[1].checked) {
            let interestRateNumber = Number(interestRate.value);
            let mortgageAmmount = ammount.value;
            let mortgageAmmountNumber = parseInt(mortgageAmmount.replace(/,/g, ''));
            
            let interestOnlyNumber = Number((interestRateNumber/100*mortgageAmmountNumber)/12).toLocaleString('en', { minimumFractionDigits: 2 });

            monthlyRepaymentNumber.innerText = interestOnlyNumber;

            totalPaymentNumber.innerText = Number((parseInt(interestOnlyNumber.replace(/,/g, ''))*12*Number(term.value)) + Number(mortgageAmmountNumber)).toLocaleString('en', { minimumFractionDigits: 2 });
        }
    }
})
ammount.addEventListener('input', handleInput);
term.addEventListener('input', handleInput);
interestRate.addEventListener('input', handleInputPercent);
interestRate.addEventListener('blur', handleInputPercent);

function handleInput(e){
  const nr = Number(e.target.value.replace(/\D/g, ''));
  e.target.value = nr ? nr.toLocaleString('en-US'): '';
}

function handleInputPercent(e){
    if(interestRate.value > 100) {
        interestRate.value = 99.99;
    }
  const nr = e.target.value
    .replace(/[^0-9.]/g, '')        // Remove any character that isn't a digit or a decimal point
    .replace(/(\..*)\./g, '$1')     // Keep only the first decimal point
    .replace(/^\./, '0.');          // If input starts with a decimal point, replace it with '0.'
  e.target.value = nr

  // there could still be a decimal point at the end, without decimals. So when leaving the input (blur), remove it
  if(e.type === 'blur'){
    e.target.value = nr.replace(/\.$/, '') // If last character is a decimal point, remove
  }
}

clearAllBtn.addEventListener("click", () =>{
    ammount.value = "";
    term.value = "";
    interestRate.value = "";

    resultsShow.classList.add("hidden");
    noResults.classList.remove("hidden");

    errorSpan[0].classList.add("hidden");
    ammount.classList.remove("border-error");
    currency.classList.remove("bg-error");
    counter = 0;

    errorSpan[1].classList.add("hidden");
    term.classList.remove("border-error");
    years.classList.remove("bg-error");
    counterSecond = 0;

    errorSpan[2].classList.add("hidden");
    interestRate.classList.remove("border-error");
    percent.classList.remove("bg-error");
    counterThird = 0;
})

ammount.addEventListener('focus', focusEvent);
term.addEventListener('focus', focusEvent);
interestRate.addEventListener('focus', focusEvent);

ammount.addEventListener('focusout', focusOutEvent);
term.addEventListener('focusout', focusOutEvent);
interestRate.addEventListener('focusout', focusOutEvent);

function focusEvent(e) {
    e.target.classList.add("focus-border");
    if(e.target.nextElementSibling != null) {
        e.target.nextElementSibling.classList.add("focus-bg");
    }
    if(e.target.previousElementSibling != null) {
        e.target.previousElementSibling.classList.add("focus-bg");
    }
}
function focusOutEvent(e) {
    e.target.classList.remove("focus-border");
    if(e.target.nextElementSibling != null) {
        e.target.nextElementSibling.classList.remove("focus-bg");
    }
    if(e.target.previousElementSibling != null) {
        e.target.previousElementSibling.classList.remove("focus-bg");
    }
}
for(let i=0; i<radioButtons.length;i++) {
    radioButtons[i].addEventListener("click", () =>{
        radioButtonCheck();
    })
}
function radioButtonCheck() {
    for(let i=0; i<radioButtons.length;i++) {
        if(radioButtons[i].checked) {
            radioButtons[i].parentElement.classList.add("radio-check");
        } else if(!radioButtons[i].checked) {
            radioButtons[i].parentElement.classList.remove("radio-check");
        }
    }
}























































// let counter = 0;
// let newValue;
// ammount.addEventListener("keydown", (e) => {
//     // if((ammount.value.toString()[0] === ".") || (ammount.value.toString()[0] === "0")) {
//     //     ammount.value = "";
//     //     return;
//     // }
//     if (e.key === "Backspace") {
//         return;
//     }
//     if(ammount.value.toString().length === 3 && e.key !== "Backspace") {
//         // for(let i=0;i<ammount.value.toString().length;i++) {
//         //   let newValue =  ammount.value.toString().slice(i) + "," + ammount.value.toString().slice(i+1);
//         //   ammount.value = newValue;
//         //console.log(ammount.value.toString().slice(i, i+1))
//         //   console.log(ammount.value.toString().slice(i+1))
//         //}
//         //console.log("lul")
//         //ammount.value = ammount.value.toString().slice(0, 1) + "," + ammount.value.toString().slice(1);
//         ammount.value = ammount.value.toString().slice(0, 1) + "," + ammount.value.toString().slice(1);
//         //ammount.value = newValue;
//         counter = 1;
//     }
//     if(ammount.value.toString().length === 5 && e.key !== "Backspace" && counter === 1) {
//         counter = ammount.value.toString();
//         newValue = counter.slice(0, 1) + counter.slice(2);
//         ammount.value = newValue.slice(0, 2) + "," + newValue.slice(2);
//     }
//     // if(ammount.value.toString().length === 6 && e.key !== "Backspace") {
//     //     counter = ammount.value.toString();
//     //     newValue = counter.slice(0, 2) + counter.slice(3);
//     //     ammount.value = newValue.slice(0, 3) + "," + newValue.slice(3);
//     // }
//     // if(ammount.value.toString().length === 7 && e.key !== "Backspace") {
//     //     counter = ammount.value.toString();
//     //     newValue = counter.slice(0, 3) + counter.slice(4);
//     //     ammount.value = newValue.slice(0, 1) + "," + newValue.slice(1,4) + "," + newValue.slice(4);
//     // }
//     //console.log(ammount.value.toString().length)
//     if(ammount.value.toString().length < 3) {
//         counter = 0;
//     }
// })
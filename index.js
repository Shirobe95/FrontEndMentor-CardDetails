const cardNumberShow = document.querySelector('.cardNumber');
const cardNameShow = document.querySelector('.cardName');
const cardDateShow = document.querySelector('.cardDate');
const cardCVCShow = document.querySelector('.cardBack');

const cardNameInput = document.getElementById('cardHolder');
const cardNumberInput = document.getElementById('cardNumber');
const cardMMDateInput = document.getElementById('expDateMM');
const cardYYDateInput = document.getElementById('expDateYY');
const cardCVCInput = document.getElementById('cvc');

/* Add a event listener when the input is changed */
cardNumberInput.addEventListener('input', ()=>{

    let number = cardNumberInput.value;

    let empty_nuber_lenght = 16 - number.length;
    
    for(let i=0 ; i < empty_nuber_lenght ; i++){
        number += '*';
    }

    let slice1 = number.slice(0,4);
    let slice2 = number.slice(4,8);
    let slice3 = number.slice(8,12);
    let slice4 = number.slice(12,16);
    let numberTransformed = slice1 + ' ' + slice2 + ' ' + slice3 + ' ' + slice4
    cardNumberShow.innerHTML = numberTransformed;
});

cardNameInput.addEventListener('input', ()=>{
    if(cardNameInput.value == ''){
        cardNameShow.innerHTML = 'Name';
    }else{
        cardNameShow.innerHTML = cardNameInput.value;
    }
});

cardMMDateInput.addEventListener('input' , ()=>{
    let input = cardMMDateInput.value;

    let empty_input_lenght = 2 - input.length;
    
    for(let i=0 ; i < empty_input_lenght ; i++){
        input += '*';
    }

    let currentDate = cardDateShow.innerHTML;

    let currentYear = currentDate.slice(5,7);

    cardDateShow.innerHTML = input + ' / ' + currentYear;

})

cardYYDateInput.addEventListener('input' , ()=>{
    let input = cardYYDateInput.value;

    let empty_input_lenght = 2 - input.length;
    
    for(let i=0 ; i < empty_input_lenght ; i++){
        input += '*';
    }

    let currentDate = cardDateShow.innerHTML;

    let currentMM = currentDate.slice(0,2);

    cardDateShow.innerHTML = currentMM + ' / ' + input;

})


cardCVCInput.addEventListener('input', ()=>{
    let number = cardCVCInput.value;

    let empty_nuber_lenght = 3 - number.length;
    
    for(let i=0 ; i < empty_nuber_lenght ; i++){
        number += '*';
    }

    cardCVCShow.innerHTML = number;
});

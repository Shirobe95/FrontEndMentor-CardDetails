const cardNumberShow = document.querySelector('.cardNumber');
const cardNameShow = document.querySelector('.cardName');
const cardDateShow = document.querySelector('.cardDate');
const cardCVCShow = document.querySelector('.cardBack');

const cardNameInput = document.getElementById('cardHolder');
const cardNumberInput = document.getElementById('cardNumber');
const cardMMDateInput = document.getElementById('expDateMM');
const cardYYDateInput = document.getElementById('expDateYY');
const cardCVCInput = document.getElementById('cvc');

const confirmBtn = document.querySelector('#confirmBtn');

const cardInputAlert = document.getElementById('alertNumber');

/* Add a event listener when the input is changed */
cardNumberInput.addEventListener('input', ()=>{

    let number = cardNumberInput.value;

    let empty_nuber_lenght = 16 - number.length;
    
    for(let i=0 ; i < empty_nuber_lenght ; i++){
        number += '0';
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
        input += '0';
    }

    let currentDate = cardDateShow.innerHTML;

    let currentYear = currentDate.slice(5,7);

    cardDateShow.innerHTML = input + ' / ' + currentYear;

})

cardYYDateInput.addEventListener('input' , ()=>{
    let input = cardYYDateInput.value;

    let empty_input_lenght = 2 - input.length;
    
    for(let i=0 ; i < empty_input_lenght ; i++){
        input += '0';
    }

    let currentDate = cardDateShow.innerHTML;

    let currentMM = currentDate.slice(0,2);

    cardDateShow.innerHTML = currentMM + ' / ' + input;

})


cardCVCInput.addEventListener('input', ()=>{
    let number = cardCVCInput.value;

    let empty_nuber_lenght = 3 - number.length;
    
    for(let i=0 ; i < empty_nuber_lenght ; i++){
        number += '0';
    }

    cardCVCShow.innerHTML = number;
});


confirmBtn.addEventListener('click', function(event){
    event.preventDefault();

    let wrongName = false;
    let wrongNumber = false;
    let wrongDate = false;
    let wrongCVC = false;

    if(cardNameInput.value == ''){
        document.getElementById('alertName').style.visibility = 'visible';
        cardNameInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongName = true;
    }
    else{
        document.getElementById('alertName').style.visibility = 'hidden';
        cardNameInput.style.border = '1px solid rgb(117, 117, 117)';
        wrongName = false;
    }

    if(cardNumberInput.value == ''){
        cardInputAlert.innerHTML = "Can't be blank";
        cardInputAlert.style.visibility = 'visible';
        cardNumberInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongNumber = true ;
    }else if(cardNumberInput.value.length != 16){
        cardInputAlert.innerHTML = "Missing numbers";
        cardInputAlert.style.visibility = 'visible';
        cardNumberInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongNumber = true ;
    }else if(containsLetter(cardNumberInput.value)){
        cardInputAlert.innerHTML = "Wrong format, numbers only";
        cardInputAlert.style.visibility = 'visible';
        cardNumberInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongNumber = true ;
    }else{
        cardInputAlert.style.visibility = 'hidden';
        cardNumberInput.style.border = '1px solid rgb(117, 117, 117)';
        wrongNumber = false ;
    }

    function containsLetter(string){
        for(let i=0 ; i<string.length ; i++){
            if(isNaN(string[i])){
                return true;
            }
        }   
        return false;
    }

    if(cardMMDateInput.value == '' || cardYYDateInput.value == ''){
        document.getElementById('alertDate').style.visibility = 'visible';
        cardMMDateInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        cardYYDateInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongDate = true;
    }else if(containsLetter(cardMMDateInput.value) || containsLetter(cardYYDateInput.value)){
        document.getElementById('alertDate').innerHTML = 'Numbers only';
        document.getElementById('alertDate').style.visibility = 'visible';
        cardMMDateInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongDate = true;
    }else if(parseInt(cardMMDateInput.value) > 12 || parseInt(cardMMDateInput.value) < 1){
        document.getElementById('alertDate').innerHTML = 'Wrong Month';
        document.getElementById('alertDate').style.visibility = 'visible';
        cardMMDateInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongDate = true;
    }else if(parseInt(cardYYDateInput.value) < 23 ){
        document.getElementById('alertDate').innerHTML = 'Wrong Year';
        document.getElementById('alertDate').style.visibility = 'visible';
        cardYYDateInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongDate = true;
    }else{
        document.getElementById('alertDate').style.visibility = 'hidden';
        cardMMDateInput.style.border = '1px solid rgb(117, 117, 117)';
        cardYYDateInput.style.border = '1px solid rgb(117, 117, 117)';
        wrongDate = false;
    }

    if(cardCVCInput.value == ''){
        document.getElementById('alertCVC').innerHTML = "Can't be blank";
        document.getElementById('alertCVC').style.visibility = 'visible';
        cardCVCInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongCVC = true;
    }else if(containsLetter(cardCVCInput.value)){
        document.getElementById('alertCVC').innerHTML = 'Numbers Only';
        document.getElementById('alertCVC').style.visibility = 'visible';
        cardCVCInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
        wrongCVC = true;
    }else{
        document.getElementById('alertCVC').style.visibility = 'hidden';
        cardCVCInput.style.border = '1px solid rgb(117, 117, 117)';
        wrongCVC = false;
    }

    if( !wrongName && !wrongNumber && !wrongDate && !wrongCVC){
        console.log('All Good');
        document.getElementById('completedForm').classList.remove('formCompletedHide');
        document.getElementById('formToComplete').classList.add('formToCompleteHide');
    }

})

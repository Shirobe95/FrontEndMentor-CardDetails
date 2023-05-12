
// Getting HTML Elements
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


/* Add a event listener when the input is changed and adding whitespace every 4 numbers */
// Number Field
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

    // Update displayed card numbers
    cardNumberShow.innerHTML = numberTransformed;
});


// Update displayed fields on card after an input
// Name Field
cardNameInput.addEventListener('input', ()=>{
    if(cardNameInput.value == ''){
        cardNameShow.innerHTML = 'Name';
    }else{
        cardNameShow.innerHTML = cardNameInput.value;
    }
});

// Month Field
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

// Year Field
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

// CVC Field
cardCVCInput.addEventListener('input', ()=>{
    let number = cardCVCInput.value;

    let empty_nuber_lenght = 3 - number.length;
    
    for(let i=0 ; i < empty_nuber_lenght ; i++){
        number += '0';
    }

    cardCVCShow.innerHTML = number;
});

// Remove animations after 0.5s
function turnAnimationsOff(){
    setTimeout(() => {
        cardNameInput.style.animation = '';
        cardNumberInput.style.animation = '';
        cardMMDateInput.style.animation = '';
        cardYYDateInput.style.animation = '';
        cardCVCInput.style.animation = '';
    }, 500);
}

// Function to display warning on entering : Input Component,Warning Componen and Text to Display
function showWarning(componentInput,warningComponent,warningText){
    warningComponent.innerHTML = warningText;
    warningComponent.style.visibility = 'visible';

    componentInput.style.border = ' 1px solid hsl(0, 100%, 66%)';
    componentInput.style.animation = 'wrongfiled 0.5s linear';

    turnAnimationsOff();
}

// Function to hide warning on entering : Input Component,Warning Componen
function hideWarning(componentInput,warningComponent){
    componentInput.style.border = '1px solid rgb(117, 117, 117)';
    warningComponent.style.visibility = 'hidden';
}

// Add a event Listener on Summit
confirmBtn.addEventListener('click', function(event){
    // Prevent default false flag
    event.preventDefault();

    // Flags of forms fields
    let wrongName = false;
    let wrongNumber = false;
    let wrongMMDate = false;
    let wrongYYDate = false;
    let wrongCVC = false;

    // Function to detect letters in Input Fields
    function containsLetter(string){
        for(let i=0 ; i<string.length ; i++){
            if(isNaN(string[i])){
                return true;
            }
        }   
        return false;
    }

    // Name Input Validation
    if(cardNameInput.value == ''){
        showWarning(cardNameInput,document.getElementById('alertName'),"Can't be blank");
        wrongName = true;
    }
    else{
        hideWarning(cardNameInput,document.getElementById('alertName'));
        wrongName = false;
    }

    // Number Input Validation
    if(cardNumberInput.value == ''){
        showWarning(cardNumberInput,document.getElementById('alertNumber'),"Can't be blank");
        wrongNumber = true ;
    }else if(cardNumberInput.value.length != 16){
        showWarning(cardNumberInput,document.getElementById('alertNumber'),"Missing numbers");
        wrongNumber = true ;
    }else if(containsLetter(cardNumberInput.value)){
        showWarning(cardNumberInput,document.getElementById('alertNumber'),"Wrong format, numbers only");
        wrongNumber = true ;
    }else{
        hideWarning(cardNumberInput,document.getElementById('alertNumber'));
        wrongNumber = false ;
    }

    // Month Date Input Validation
    if(cardMMDateInput.value == ''){
        showWarning(cardMMDateInput,document.getElementById('alertDate'),"Can't be blank");
        wrongMMDate = true;
    }else if(containsLetter(cardMMDateInput.value)){
        showWarning(cardMMDateInput,document.getElementById('alertDate'),"Numbers only");
        wrongMMDate = true;
    }else if(parseInt(cardMMDateInput.value) > 12 || parseInt(cardMMDateInput.value) < 1){
        showWarning(cardMMDateInput,document.getElementById('alertDate'),"Wrong Month");
        wrongMMDate = true;
    }else{
        hideWarning(cardMMDateInput,document.getElementById('alertDate'));
        wrongMMDate = false;
    }
    
    // Year Date Input Validation
    if(cardYYDateInput.value == ''){
        showWarning(cardYYDateInput,document.getElementById('alertDate'),"Can't be blank");
        wrongYYDate = true;
    }else if(containsLetter(cardYYDateInput.value)){
        showWarning(cardYYDateInput,document.getElementById('alertDate'),"Numbers only");
        wrongYYDate = true;
    }else if(parseInt(cardYYDateInput.value) < 23 ){
        showWarning(cardYYDateInput,document.getElementById('alertDate'),"Wrong Year");
        wrongYYDate = true;
    }else{
        if(!wrongMMDate){
            hideWarning(cardYYDateInput,document.getElementById('alertDate'));
        }
        wrongYYDate = false;
    }

    // CVC Input Validation
    if(cardCVCInput.value == ''){
        showWarning(cardCVCInput,document.getElementById('alertCVC'),"Can't be blank");
        wrongCVC = true;
    }else if(containsLetter(cardCVCInput.value)){
        showWarning(cardCVCInput,document.getElementById('alertCVC'),"Numbers only");
        wrongCVC = true;
    }else{
        hideWarning(cardCVCInput,document.getElementById('alertCVC'));
        wrongCVC = false;
    }

    // Conditional to complete entry
    if( !wrongName && !wrongNumber && !wrongMMDate && !wrongYYDate && !wrongCVC){
        document.getElementById('completedForm').classList.remove('formCompletedHide');
        document.getElementById('formToComplete').classList.add('formToCompleteHide');
    }

})

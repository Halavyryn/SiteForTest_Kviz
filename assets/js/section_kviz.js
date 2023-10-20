let answer = document.querySelector('.kviz__popup-answer');
const ParentInsert = document.querySelector('.kviz__popup');

const textPopup = [];
let textRadio = '';

/*FOR DELETE ALL VALUES*/
function DeleteValues() {
    window.location.href = '/';
}





/*PAGE3 INPUT*/
function onInput() {
    var login = document.getElementById("login");
    var p1 = document.getElementById("kviz__popup3-answer1");
    login.addEventListener('input', function() {
        if (p1 != null && login != null)
            p1.innerHTML = login.value;
    });
}

function onDropdown() {
    const DropdownButton = document.getElementById('select-1');
    const input= document.getElementById("login");
    let DropdownButtonText;
    DropdownButton.addEventListener("click", function (e) {
        DropdownButtonText = document.getElementById("dropdown_btn").value;
        input.value = DropdownButtonText;
    });
}


function AddTextPopup3(){
    const ResPopup = document.querySelector('.popup3 .kviz__popups .kviz__popup2');
    ResPopup.innerHTML =
        "<h3 class=\"kviz__popup3-question \">Вы любите проходить тесты?</h3>\n" +
        "<p class=\"kviz__popup3-answer\">" + textRadio + "</p>"
}

function AddTextPopup2(){
    const ResPopup = document.querySelector('.popup3 .kviz__popups .kviz__popup');
    ResPopup.innerHTML =
        "<h3 class=\"kviz__popup-question \">Какие виды тестов вам нравятся?</h3>\n" +
        "<p class=\"kviz__popup-answer\">" + textPopup.join(', ') + "</p>"
}







/*RADIOBOX*/
function AddTextPopup(){
    const ResPopup = document.querySelector('.popup2 .kviz__popups .kviz__popup');
    ResPopup.innerHTML =
        "<h3 class=\"kviz__popup-question \">Какие виды тестов вам нравятся?</h3>\n" +
        "<p class=\"kviz__popup-answer\">" + textPopup.join(', ') + "</p> </div>"
}

function AddRadioValue(RadioText){
    textRadio = RadioText;
    let result = document.querySelector('.popup2 .kviz__popups .kviz__popup2');
    const textAnswer = document.querySelector('.popup2 .kviz__popups .kviz__popup2-answer');
    if(textAnswer.innerHTML === ""){
        result.innerHTML =
            "<h3 class=\"kviz__popup2-question\">Вы любите проходить тесты?</h3>\n" +
            "<p class=\"kviz__popup2-answer\">" + textRadio + "</p>"

    }else{
        result.innerHTML =
            "<h3 class=\"kviz__popup2-question\">Вы любите проходить тесты?</h3>\n" +
            "<p class=\"kviz__popup2-answer\">" + textRadio + "</p>"
    }
}

var radios = document.querySelectorAll('input[type=radio][name="radio"]');
radios.forEach(radio => radio.addEventListener('change', () =>
    {
        AddRadioValue(radio.value);
    }
));







/*FOR CHECKBOX*/


function myFunction(tema) {
    let checkBox = document.getElementById(tema);
    let num = parseInt(tema.match(/\d+/))
    let text = document.getElementById('text' + num).innerHTML;

    if (checkBox.checked === true){
        if(!textPopup.includes(text)){
            answer.childNodes[0].data += text + ", ";
            textPopup.push(text)
        }
    } else {
        if(textPopup.includes(text)){
            let index = textPopup.indexOf(text);
            textPopup.splice(index, 1);
            if(textPopup.length>0){
                answer.childNodes[0].data = textPopup.join(', ') + ", ";
            }
            else{
                answer.childNodes[0].data = textPopup + " ";
            }
        }
    }
}



/* POPUPPAGEs*/
let popup = document.getElementById("popup");
let popup2 = document.getElementById("popup2");
let popup3 = document.getElementById("popup3");

/*FUNCTION OPENPAGES*/
function openPopup(){
    popup.classList.add("open-popup");
}
function openPopup2(){
    popup2.classList.add("open-popup2");
}
function openPopup3(){
    popup3.classList.add("open-popup3");
}

/*Button next*/
function closePopup(){
    popup.classList.remove("open-popup");
    openPopup2();
    AddTextPopup();
}
function closePopup2(){
    popup2.classList.remove("open-popup2");
    openPopup3();
    onInput();
    onDropdown();
    AddTextPopup();
    AddTextPopup2();//добавляет в третью страницу поап
    AddTextPopup3();
}

function closePopup3(){
    popup3.classList.remove("open-popup3");
    DeleteValues();
    openPopup();
}

/*button previos*/
function closePopup_previos2(){
    popup2.classList.remove("open-popup2");
    openPopup();
}
function closePopup_previos3(){
    popup3.classList.remove("open-popup3");
    openPopup2();
}


/*DROPDOWN */
// select-1 – id элемента
const select1 = new ItcCustomSelect('#select-1');




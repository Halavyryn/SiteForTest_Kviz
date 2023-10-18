/*FUNCTIONS FOR FEEDBACK POPUP*/

let FeedbackPopup = document.getElementById("feedback__popup");

function OpenFeedbackPopup(){
    FeedbackPopup.classList.add("feedback__popup-open");
}
function CloseFeedbackPopup(){
    FeedbackPopup.classList.remove("feedback__popup-open");
    OpenFeedbackEndPopup();
}

/*FUNCTIONS FOR FEEDBACK END POPUP*/
let FeedbackEndPopup = document.getElementById("feedback__end");

function OpenFeedbackEndPopup(){
    FeedbackPopup.classList.add("feedback__end-open");
}
function CloseFeedbackEndPopup(){
    FeedbackPopup.classList.remove("feedback__end-open");
}
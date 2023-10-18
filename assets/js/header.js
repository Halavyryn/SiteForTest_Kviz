/*FUNCTIONS FOR FEEDBACK END POPUP*/
let FeedbackEndPopup = document.getElementById("feedback__end");

function OpenFeedbackEndPopup(){
    FeedbackEndPopup.classList.add("feedback__end-open");
}
function CloseFeedbackEndPopup(){
    FeedbackEndPopup.classList.remove("feedback__end-open");
}



/*FUNCTIONS FOR FEEDBACK POPUP*/
let FeedbackPopup = document.getElementById("feedback__popup");

function OpenFeedbackPopup(){
    FeedbackPopup.classList.add("feedback__popup-open");
}

/*for Button*/
function CloseFeedbackPopupForButton(){
    FeedbackPopup.classList.remove("feedback__popup-open");
    OpenFeedbackEndPopup();
}

/*for Cross*/
function CloseFeedbackPopupForCross(){
    FeedbackPopup.classList.remove("feedback__popup-open");
}
/*
    This is the javascript file for the login page.
    It will hold all the functions for features on the login page.
*/

//HELPER & UTILITY METHODS
//toggleElement(elementID) - function to toggle a certain element
//in the DOM
//@param elementID -> valid element ID of an element in the DOM
function toggleElement(elementID){
    //retrieve the element from the DOM
    let elem = document.getElementById(elementID);

    //check its current display status
    //if display = none
    if(elem.style.display == 'none' || elem.style.display == ''){
        //show the element
        elem.style.display = 'inline-block';
    }
    //otherwise, hide the element
    else{
        elem.style.display = 'none';
    }
}

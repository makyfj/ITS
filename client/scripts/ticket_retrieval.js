/*
    This is the javascript file for the ticket retrieval page.
    It will hold all the functions for features on the ticket retrieval page.
*/

//HELPER & UTILITY METHODS
//showOpenIncidents() - function to toggle a certain element
//in the DOM
//@param elementID -> valid element ID of an element in the DOM
function showOpenIncidents(){
    //get open incidents container
    //PLACEHOLDER
    document.getElementById('incidentContainer').innerHTML = `
        This is where we will display all the open incidents for the user to select. 
        <br><br> From their selection we will update the following attributes corresponding
        to the incidents they have selected. The incidents will be pulled from the backend.
    `
}
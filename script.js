
//once the document is loaded allow these calls to be made 
$(document).ready(()=> {
    $("#ww1-wiki-call").on("click",async (event)=>{
        event.preventDefault();  
        const data = await callWiki("World_War_I")
        if(data.hasOwnProperty("query")){
            let extract = getExtract(data.query.pages);
            $(document.createElement("p"))          //create a new p element and wrap it in jquery selector
                .text(extract)                      // set the text of that new element to the extract we got
                .appendTo($("#ww1-wiki-display"));  // append that p element to the div by the given id
            }
    })

    fetchAndAppend("Battle_of_the_Frontiers", "#bof-wiki"); 
    fetchAndAppend("Second_Battle_of_Ypres", "#sboty-wiki");

});


async function callWiki(query){
    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=${query}&explaintext=1&format=json&origin=*`); 
        const data = await response.json()
        return data; 
    } catch (error) {
        console.error(error);        
    }
}

function getExtract(pages){
    let key = Object.keys(pages);
    //console.log("keys", key);
    const {title, extract} = pages[key]
    return extract;
}

async function fetchAndAppend(query, container){
    const data = await callWiki(query)
    if(data.hasOwnProperty("query")){
        let extract = getExtract(data.query.pages);
        $(document.createElement("p"))          //create a new p element and wrap it in jquery selector
            .text(extract)                      // set the text of that new element to the extract we got
            .appendTo($(container));            // append that p element to the div by the given id
    }
}
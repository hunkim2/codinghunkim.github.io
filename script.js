
//Gets data-id of element that was clicked
function getNASAImg(elem){
    var BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1001&api_key=DEMO_KEY&camera="    
    var cameraType = elem.getAttribute("data-id");
    BASE_URL += cameraType;
    fetchNASA(BASE_URL);
};

//calls API and calls appendImages() with array of photos
async function fetchNASA(url){
    try {
        let response = await fetch(url);
        let data = await response.json();
        appendImages(data.photos);
    }
    catch(e) {
        var imgContainer = document.getElementById("list__images");
        removeChildNodesFromDom(imgContainer);
        var errorText = document.createElement("div");
        errorText.innerHTML = "There was an error, please try again later or contact codinghunkim@gmail.com";
        imgContainer.appendChild(errorText);
    }

}


//removes previous child images/text from dom
function removeChildNodesFromDom(parentNode){
    while(parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild);
    }
}

//appends array of images to DOM
function appendImages(imgArr){
    
    //to ensure that length of photos are always 6
    let imgLength = imgArr.length >= 6 ? 6 : imgArr.length;

    var imgContainer = document.getElementById("list__images");

    //removes child if it has children
    if(imgContainer.hasChildNodes()){
        removeChildNodesFromDom(imgContainer);
    }

    //if no images then append no images to dom
    if(imgArr.length === 0){
        var errorText = document.createElement("div");
        errorText.innerHTML = "No Images Were Found";
        imgContainer.appendChild(errorText);
        return 0;
    }

    //appends images from API to DOM
    for(var imgArr_x = 0; imgArr_x < imgLength; imgArr_x++){
        var img = document.createElement("IMG");
        img.classList.add("list__images--column")
        img.src = imgArr[imgArr_x].img_src;
        imgContainer.appendChild(img);
    }

}
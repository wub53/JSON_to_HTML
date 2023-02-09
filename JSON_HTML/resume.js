function renderJSON (data) {  
    var html = "";
    if (Array.isArray(data)) {
        html += "<ul>";
        $.each(data, function(index, element) {
        html += "<li>" + renderJSON(element) + "</li>";
        });
        html += "</ul>";
    } 
    else if (typeof data === "object") {
        html += "<ul>";
        $.each(data, function(key, value) {
        html += "<li><strong>" + key + ":</strong> " + renderJSON(value) + "</li>";
        });
        html += "</ul>";
    }
     else {
        html += "<span>" + data + "</span>";
    }
    return html;
      
} 

$.getJSON("resume.json", function(data) {
    $("body").append(renderJSON(data));
  });



// console.log("data")

// $.getJSON("resume.json", (data) => {  
//    // document.getElementById("resume").innerHTML = data.doc.contact.email
//    console.log("datdfsa")
//    $.each(data, (key,value) => {
//     //console.log(value)
//     $("body").append("<p>" + key + ":" + value + "</p>")
//    })
// })
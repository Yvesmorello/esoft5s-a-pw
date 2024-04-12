
function visitorCount(){

    var y = new Date().toLocaleDateString();
    var z = new Date().toLocaleTimeString();
    var x = JSON.stringify({"count":40, "lastVisit": y + ", " + z}); 

    localStorage.setItem("@visitorCount", x);
    }

visitorCount();
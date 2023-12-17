function showLoginForm() {
    document.getElementById("credentials").style.visibility = "visible";
}

function hideLoginForm() {
    document.getElementById("credentials").style.visibility = "hidden";
}

function toggleDropdown() {
    d = document.getElementById("dropdown").style.visibility;
    if (d === "" || d == "hidden") {
        out = "visible"
    } else {
        out = "hidden"
    }
    document.getElementById("dropdown").style.visibility = out;
}

function setTopic(topic) {
    document.getElementById("topic").value = topic;
}
import {MarkdownBlock, MarkdownSpan, MarkdownElement} from "md-block";

function showLoginForm() {
    document.getElementById("credentials").style.visibility = "visible";
}

function hideLoginForm() {
    document.getElementById("credentials").style.visibility = "hidden";
}
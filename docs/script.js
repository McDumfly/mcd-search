const sdata = localStorage.getItem("mcd-search-data");
const popupBox = document.getElementById("popup-box");
const popupBoxText = document.getElementById("popup-box-text");

let data = {
    srcengine: "https://www.google.com/search?q=",
    commands: true,
    settings: {
        closeAfterCrossLink: false,
    },

    shorter : [
        "fb:https://www.facebook.com",
        "ig:https://www.instagram.com",
        "yt:https://www.youtube.com",
    ]
}

if (sdata != null) {
    data = JSON.parse(sdata);
} else {
    ud();
}

function ud() {
    localStorage.setItem("mcd-search-data", JSON.stringify(data));
}

const search = (keyword) => {
    keyword = String(keyword);

    let defKW = keyword;

    if (keyword.slice(0, 3) == "$>>") {
        keyword = keyword.toLowerCase();

        if (keyword.startsWith("$>>set srcengine")) {
    
            if (keyword.endsWith("chrome") || keyword.endsWith("google")) {
                data.srcengine = "https://www.google.com/search?q=";
    
            } else if (keyword.endsWith("duckduckgo") || keyword.endsWith("duck duck go")) {
                data.srcengine = "https://duckduckgo.com/?q=";
            
            } else if (keyword.endsWith("bing")) {
                data.srcengine = "https://www.bing.com/search?q=";
                
            } else {
                goFind(defKW);
            }
            
        } else if (keyword.startsWith("$>>set kw") || keyword.startsWith("$>>set keyword")) {
            const nkw = prompt("Keyword:");
            const nkc = prompt("Command:");
            data.shorter.push(nkw + ":" + nkc);

        } else if (keyword.startsWith("$>>get kws") || keyword.startsWith("$>>get keywords")) {

            for (let i = 0; i < data.shorter.length; i++) {
                popupBoxText.innerHTML += "> " + data.shorter[i] + "<br>";    
            }

            popupBox.classList.remove("hidden");

            document.getElementById("bg").style.opacity = 0.03;

        } else if (keyword.startsWith("$>>del kws") || keyword.startsWith("$>>del keywords")) {

            popupBoxText.innerHTML += "Help: Double click to delete!<br><br>";    

            for (let i = 0; i < data.shorter.length; i++) {
                popupBoxText.innerHTML += "> <span ondblclick='delkw(" + i + ")'>" + data.shorter[i] + "</span><br>";    
            }

            popupBox.classList.remove("hidden");

            document.getElementById("bg").style.opacity = 0.03;
        }
        
        else {
            
            let get = false;

            for (let i = 0; i < data.shorter.length; i++) {
                if (data.shorter[i].indexOf(keyword.slice(3, keyword.length)) != -1) {
                    get = true;
                    search(data.shorter[i].slice(3, data.shorter[i].length));
                }
            }
            
            if (get == false) {
                goFind(defKW);
            }
        }

    } else if (keyword == "" || keyword == " " || keyword == "  ") {
    
    } else {
        goFind(defKW);
    }

    ud();
}

const goFind = (kw) => {
    if (kw.slice(0, 4) == "http") {
        window.open(kw);

    } else if (kw.slice(0, 4) == "www.") {
        window.open("https://" + kw);

    } else {
        window.open(data.srcengine + kw);
    }
}

if (window.location.href.slice(0, 46) == "https://mcdumfly.github.io/mcd-search/#search=") {
    const sw = window.location.href.slice(46, window.location.href.length);
    goFind(sw);
    data.settings.closeAfterCrossLink == true ? window.close() : window.location.href = "https://mcdumfly.github.io/mcd-search/";
}

function delkw(num) {
    data.shorter.splice(num, 1);
    ud();
}

<<<<<<< HEAD
window.onkeydown = (e) => {
    let key;

    if(window.event) {                
        key = e.keyCode;
    } else if(e.which){             
        key = e.which;
    }

    if (key == 36) {
        document.getElementById("search-box").focus();
    }

    if (key == 13) {
        if (document.getElementById("search-box") == document.activeElement) {
            search(document.getElementById("search-box").value);
        }
    }
}

document.getElementById("search-box").focus();

window.addEventListener("contextmenu", 
    function (e) { 
        e.preventDefault(); 
    }, false
);

let menuopened = 0;
document.getElementById("menu").onclick = () => {
    document.getElementById("menu-list").style.display = "block";
    menuopened  = 1;
}

window.addEventListener('click', function(e){   
    if (document.getElementById('menu-list').contains(e.target)){
        // noting
    } else {
        if (menuopened == 2) {
            document.getElementById("menu-list").style.display = "none";
        }
        menuopened = 2;
    }
});

document.getElementById('search-box').o = () => {
}

function changeLogoTitle() {
    setTimeout(function() {
        document.getElementById("logo").title = "Search to > " + document.getElementById('search-box').value;
        changeLogoTitle();
    }, 10);
}

changeLogoTitle();
=======
document.getElementById("search-box").focus();
>>>>>>> 8b07e68d28dda94d74585c7524a685e3688c0587

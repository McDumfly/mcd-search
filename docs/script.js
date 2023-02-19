function gebi(id) {
    return document.getElementById(id);
}

const sdata = localStorage.getItem("mcd-search-data");
const popupBox = gebi("popup-box");
const popupBoxText = gebi("popup-box-text");

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
    ],

    bg: "",
}

if (sdata != null) {
    data = JSON.parse(sdata);
} else {
    ud();
}

if (data.bg !== "") {
    gebi("rlBG").style.backgroundImage = `url(${data.bg})`;
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

            gebi("bg").style.opacity = 0.03;

        } else if (keyword.startsWith("$>>del kws") || keyword.startsWith("$>>del keywords")) {

            popupBoxText.innerHTML += "Help: Double click to delete!<br><br>";    

            for (let i = 0; i < data.shorter.length; i++) {
                popupBoxText.innerHTML += "> <span ondblclick='delkw(" + i + ")'>" + data.shorter[i] + "</span><br>";    
            }

            popupBox.classList.remove("hidden");

            gebi("bg").style.opacity = 0.03;
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

window.onkeydown = (e) => {
    let key;

    if(window.event) {                
        key = e.keyCode;
    } else if(e.which){             
        key = e.which;
    }

    if (key == 36) {
        gebi("search-box").focus();
    }

    if (key == 13) {
        if (gebi("search-box") == document.activeElement) {
            search(gebi("search-box").value);
        }
    }
}

gebi("search-box").focus();

window.addEventListener("contextmenu", 
    function (e) { 
        e.preventDefault(); 
    }, false
);

let menuopened = 0;
gebi("menu").onclick = () => {
    gebi("menu-list").style.display = "block";
    menuopened  = 1;
}

window.addEventListener('click', function(e){   
    if (gebi('menu-list').contains(e.target)){
        // noting
    } else {
        if (menuopened == 2) {
            gebi("menu-list").style.display = "none";
        }
        menuopened = 2;
    }
});

gebi('search-box').o = () => {
}

function changeLogoTitle() {
    setTimeout(function() {
        gebi("logo").title = "Search to > " + gebi('search-box').value;
        changeLogoTitle();
    }, 10);
}

changeLogoTitle();

gebi("changeBg").onclick = () => {
    gebi("bgeditor").style.display = "block";
    gebi("bgeditor").style.opacity = "1";
}

gebi("closebgeditor").onclick = () => {
    gebi("bgeditor").style.opacity = "0";
    setTimeout(function() {
        gebi("bgeditor").style.display = "none";
    }, 200);
}

gebi("bgimg").onchange = () => {
    const files = gebi("bgimg").files;
    if (!files || files.length == 0)
        return;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        gebi("bgpreview").style.backgroundImage = "url(" + reader.result + ")";

        gebi("setbg").onclick = () => {
            gebi("rlBG").style.backgroundImage = "url(" + reader.result + ")";
            data.bg = reader.result;
            ud();
        }
    };
}

gebi("bgimglink").onchange = () => {
    gebi("bgpreview").style.backgroundImage = "url(" + gebi("bgimglink").value + ")";
    gebi("setbg").onclick = () => {
        gebi("rlBG").style.backgroundImage = "url(" + gebi("bgimglink").value + ")";
        data.bg = gebi("bgimglink").value;
        gebi("bgimglink").value = "";
        ud();
    }
}

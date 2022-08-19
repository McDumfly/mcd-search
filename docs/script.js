const sdata = localStorage.getItem("mcd-search-data");
const popupBox = document.getElementById("popup-box");
const popupBoxText = document.getElementById("popup-box-text");

let data = {
    srcengine: "https://www.google.com/search?q=",
    commands: true,

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

function delkw(num) {
    data.shorter.splice(num, 1);
    ud();
}
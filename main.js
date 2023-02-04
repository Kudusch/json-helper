//https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript?page=1&tab=scoredesc#tab-top
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        ret = '<span class="' + cls + '">' + match + '</span>';
        return ret;
    });
}

//https://stackoverflow.com/questions/6787383/how-to-add-remove-a-class-in-javascript
function hasClass(ele,cls) {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}

function get_url() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for(var k of urlParams.keys()) {
        if (k == "url") {
            const regex = /^\?url=(.*)$/gm;
            var url = (window.location.search).match(regex)
            console.log(url);
            return url;
        }
    }
    return document.getElementById('url').value;
}

function get_stats(json) {
    return true
}

function do_replacement(find, replace) {
    var input_url = document.getElementById('url');
    var request_url = document.getElementById('request_url');
    request_url.innerHTML = input_url.value.replace(find, replace);
}

function add_replacement() {
    var replacements = document.getElementById('replacements');
    replacements.innerHTML = replacements.innerHTML + "<div class='replacement'><lable>s/ </lable><input name='find' class='find' type='text'></input><label> / </label><input name='replace' class='replace' type='text'></input><label> /r</label></div>";
    extend_menu();
    extend_menu();
}

function get_json() {
        // make headers
        const request_headers = new Headers();
        var header_select = document.getElementById('header_key');
        header_key = header_select.options[header_select.selectedIndex].text;
        header_value = document.getElementById('header_value').value.trim();
        request_headers.append(header_key, header_value);
        
        // timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        removeClass(document.getElementById('wait'), "hidden");
        var url = document.getElementById('request_url').innerHTML;
        fetch(
            url,
            {
                method: "GET",
                headers: request_headers,
                signal: controller.signal,
            }
        ).then(response => {
            document.getElementById('request_status').innerHTML = response.status;
            return response.json();
        }).then(data => {
            addClass(document.getElementById('wait'), "hidden");
            removeClass(document.getElementById('request_status'), "hidden");
            document.getElementById('request_json').innerHTML = syntaxHighlight(data);
        }).catch(err => {
            document.getElementById('error').innerHTML = err;
            addClass(document.getElementById('wait'), "hidden");
        });
    }

    function extend_menu() {
        var button = document.getElementById("extend");
        button.classList.toggle("active");
        var content = button.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
    }
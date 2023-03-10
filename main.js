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
  if (ele.className) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  } else {
    return false;
  }
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
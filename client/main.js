
var textInput = document.getElementById('textInput');
var chats = document.getElementById('chats');
var openBtn = document.getElementById('openBtn');
var sendBtn = document.getElementById('sendBtn');
var stateText = document.getElementById('stateText');

var ws = null;

textInput.onkeypress = function (e) {
    if (e.keyCode == 13) {
        flushTextInput();
        e.preventDefault();
    }
}

function flushTextInput () {
    if (ws && ws.readyState == WebSocket.OPEN) {
        ws.send(textInput.value);
    }
    textInput.value = null;
}

function webSocketProtocol () {
    if (window.location.protocol == 'https:') {
        return 'wss';
    }
    else {
        return 'ws';
    }
}

openBtn.onclick = function (e) {
    if (ws) {
        try {
            ws.close();
        }
        catch (e) {
            console.error(e);
        }
    }

    ws = new WebSocket(webSocketProtocol() + "//" + window.location.host);
    ws.onopen = function () {
        stateText.innerText = "OPEN";
    };
    ws.onclose = function () {
        stateText.innerText = "CLOSE";
    };
    ws.onerror = function (err) {
        stateText.innerText = "ERROR";
        if (err.message) {
            stateText.innerText += ": " + err.message;
        }
    };
    ws.onmessage = function (e) {
        chats.value += '\n' + e.data;
    };
};

sendBtn.onclick = function (e) {
    flushTextInput();
}





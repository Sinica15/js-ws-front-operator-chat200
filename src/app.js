import './css/styles.css';

function gEI(id) {
    return document.getElementById(id);
}

function sendSome(data) {
    const url = "http://" + location.hostname + ":" + location.port + "/settings";

    fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(data), // data может быть типа `string` или {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => console.log('Успех:', JSON.stringify(response)))
        .catch(error => console.error('Ошибка:', error));
}

let sendButton = gEI("send-btn");
sendButton.addEventListener("click", function () {
    sendSome({
        chat_title:         gEI("chat-title").value,
        bot_name:           gEI("bot-name").value,
        position:           gEI("position").value,
        allow_to_minimize:  gEI("allow-to-minimize").checked,
        allow_drag:         gEI("allow-drag").checked,
        require_name:       gEI("require-name").checked,
        show_data_time:     gEI("show-data-time").checked
    });
});
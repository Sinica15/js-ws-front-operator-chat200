import {id} from "./usefulFunctions";
import {sendMsg, sendServiceMsg} from "./WS";

export let chatWithClient = {};

export function addPersonsListeners() {
    id('userlist').addEventListener('click', e => {
        let uuid = undefined;
        let person = undefined;
        let status = undefined;
        e.path.some(item => {
            if(item.localName == 'li') {
                // console.log(item);
                chatWithClient.uuid     = uuid      = item.children[3].innerText;
                chatWithClient.person   = person    = item.children[0].innerText;
                chatWithClient.status   = status    = item.children[2].innerText;
                return 0;
            }
        });
        if (person == 'Client' && status == 'free'){
            // console.log(`connect to ${uuid}`);
            sendServiceMsg('client connectClient', uuid);
            id('active-user').innerText = `${person} ${uuid}`;
        }

    });
}

export function addSendBtnListener() {
    id('chat-send').addEventListener('click', () => {
        sendMsg(document.querySelector('.user-chat .chat-input').value.trim());
        document.querySelector('.user-chat .chat-input').value = '';
    });
}

export function addChatConfigListener(){
    let sendButton = id("send-btn");
    sendButton.addEventListener("click", function () {
        sendSome({
            chat_title:         id("chat-title").value,
            bot_name:           id("bot-name").value,
            position:           id("position").value,
            allow_to_minimize:  id("allow-to-minimize").checked,
            allow_drag:         id("allow-drag").checked,
            require_name:       id("require-name").checked,
            show_data_time:     id("show-data-time").checked
        });
    });
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
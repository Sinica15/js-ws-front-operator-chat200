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
    let input = document.querySelector('.user-chat .chat-input');
    input.addEventListener("keypress", function (e) {
        // console.log(input.value.trim());
        if (e.keyCode === 13 && input.value.trim() != '') {
            sendMsg(input.value.trim());
            input.value = '';
            if(e.preventDefault) e.preventDefault();
                return false;
        }
    });
    id('chat-send').addEventListener('click', () => {
        if (input.value.trim() != '') {
            sendMsg(input.value.trim());
            input.value = '';
        }
    });
}

export function addRunCommand() {
    id('param-btns').addEventListener('click', e => {
        if (e.path[0].localName == 'button' && chatWithClient.uuid !== undefined){
            console.log('sending', chatWithClient.uuid, e.path[0].innerText);
            sendServiceMsg(e.path[0].innerText, chatWithClient.uuid);
        }
    })
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
    // const url = "http://" + location.hostname + ":" + location.port + "/setconfig";
    const url = "http://" + location.hostname + ":" + 9004 + "/setconfig";
    console.log(data);

    fetch(url, {
        method: 'post', // или 'PUT'
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // data может быть типа `string` или {object}!
    }).then(
        res => console.log('Успех:', [res, res.status, res.body, res.text()]),
        error => console.error('Ошибка:', error)
    );

    // let http = new XMLHttpRequest();
    // http.open('POST', url, true);
    //
    // //Send the proper header information along with the request
    // http.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    //
    // http.onreadystatechange = function() {//Call a function when the state changes.
    //     if(http.readyState == 4 && http.status == 200) {
    //         console.log(http.responseText);
    //     }
    // };
    // http.send(data);

}
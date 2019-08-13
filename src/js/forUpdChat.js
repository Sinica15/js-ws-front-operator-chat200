import {formatingTime, id} from "./usefulFunctions";
import {chatWithClient} from "./listeners";

export let personsListOnline = {};

export function connectUpdate(listObj) {
    let parsedList = personsListOnline = JSON.parse(listObj);
    personsListUpdate(parsedList);
    chatMsgsUpdate(parsedList);
}

function personsListUpdate(parsedList) {
    let listOut = '';
    parsedList.clients.forEach(person => listOut += personRender(person, false));
    parsedList.operators.forEach(person => listOut += personRender(person, true));
    id('userlist').innerHTML = listOut;
}

export function msgInChatRender(msgObj) {
    return (
        `<div class="sender-${msgObj.fromWho}">` +
            `<p>${msgObj.message}</p>` +
            `<p class="sender-datetime">` +
                `<span class="sender">${msgObj.fromWho}</span> ` +
                `<span class="datetime">${formatingTime(msgObj.date)}</span>` +
            `</p>` +
        `</div>`
    );
}

function chatMsgsUpdate(parsedList) {
    let chatObj = [];
    let unread = 0;
    parsedList.clients.some(client => {
        if (client.uuid == chatWithClient.uuid){
            chatObj = client.messageHistory;
            unread = client.unreadMsgs;
            return 0;
        }
    });
    let out = '';
    chatObj.forEach(msgObj => out += msgInChatRender(msgObj));
    id('chat-window').innerHTML = out;
}

function personRender(person, isOp) {
    // console.log(person);
    let unreadSpan = person.unreadMsgs == 0 ? '' :`<span id="pers-unread" class="pers-unread">${person.unreadMsgs}</span> `;
    unreadSpan = person.unreadMsgs === undefined ? '' : unreadSpan;
    let divClass = 'client-block';
    if (isOp) divClass = 'operator-block';
    if (!isOp && person.currentStaus == 'in conversation') divClass = 'client-busy-block';
    return (
        `<li class="${divClass} personcl">` +
            // `<div>` +
                `<span id="pers-nick" class="pers-nick">${person.nick}</span> ` +
                `<span id="pers-regtime" class="pers-regtime">${formatingTime(person.connctionTime)}</span>` +
            // `</div>` +
            // `<div>` +
                `<span id="pers-status" class="pers-status">${person.currentStaus}</span> ` +
                `<span id="pers-uuid" class="pers-uuid">${person.uuid}</span>` +
                unreadSpan +
            // `</div>` +
        `</li>`
    );
}
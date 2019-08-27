import {formatingTime, id} from "./usefulFunctions";
import {chatWithClient, sortingParams} from "./listeners";
import {personsSorting} from "./sortingPersons";

export let personsListOnline = {};

export function allUpdate(listObj = personsListOnline) {
    let parsedList = personsListOnline = listObj;
    personsListUpdate(parsedList, sortingParams);
    if (arguments.length > 0) {
        if (chatWithClient !== undefined && Object.keys(chatWithClient).length != 0) {
            let currClient;
            parsedList.clients.some(client => {
                if (client.uuid == chatWithClient.uuid){
                    currClient = client;
                    return 0;
                }
            });
            // console.log(chatWithClient);
            chatMsgsUpdate(currClient.messageHistory);
            commandsLogUpdate(currClient.serviceMsgsHistory);
        } else {
            id('chat-window').innerHTML = '';
            id('commands-log').innerHTML = '';
        }
    }

}

function personsListUpdate(parsedList, sortParams) {
    let listOut = document.createDocumentFragment();
    if (Object.keys(sortParams).length == 0) {
        parsedList.clients.forEach(person => listOut.appendChild(personRender(person)));
        parsedList.operators.forEach(person => listOut.appendChild(personRender(person)));
    } else {
        let persons = [];
        parsedList.clients.forEach(person => persons.push(person));
        parsedList.operators.forEach(person => persons.push(person));
        persons = personsSorting(persons, sortParams);
        persons.forEach(person => listOut.appendChild(personRender(person)));
    }
    id('userlist').innerHTML = '';
    id('userlist').appendChild(listOut);
}

function personRender(person) {
    let isOp = person._type == 'operator' ? true : false;
    let idOn = true;
    let divClass = 'client-block';
    if (isOp) divClass = 'operator-block';
    if (!isOp && person.currentStatus == 'in conversation') divClass = 'client-busy-block';

    let li = document.createElement('li');
    li.className = divClass + ' ' + 'personcl';

    let spanCreate = (className, text) => {
        let span = document.createElement('span');
        span.id = idOn ? '' : (className + '-' + person.uuid.substr(0, 4));
        span.className = className;
        span.innerText = text;
        return span;
    };

    li.appendChild(spanCreate('pers-nick', person.nick));
    li.appendChild(spanCreate('pers-regtime', formatingTime(person.connectionTime)));
    li.appendChild(spanCreate('pers-status', person.currentStatus));
    li.appendChild(spanCreate('pers-uuid', person.uuid));
    if (person.unreadMsgs !== undefined && person.unreadMsgs != 0)
        li.appendChild(spanCreate('pers-unread', person.unreadMsgs));

    return li;
}

function chatMsgsUpdate(messages) {
    let out = document.createDocumentFragment();
    messages.forEach(msgObj => out.appendChild(msgInChatRender(msgObj)));
    id('chat-window').innerHTML = '';
    id('chat-window').appendChild(out);
}

export function msgInChatRender(msgObj) {
    let senderSpan = document.createElement('span');
        senderSpan.className = 'sender';
        senderSpan.innerText = msgObj.fromWho;

    let datetimeSpan = document.createElement('span');
        datetimeSpan.className = 'datetime';
        datetimeSpan.innerText = formatingTime(msgObj.date);

    let senderInfo = document.createElement('div');
        senderInfo.className = `sender-${msgObj.fromWho}`;
        senderInfo.appendChild(senderSpan);
        senderInfo.appendChild(datetimeSpan);

    let message = document.createElement('div');
        message.innerText = msgObj.message;

    let div = document.createElement('div');
        div.appendChild(senderInfo);
        div.appendChild(message);

    return div;
}

function commandsLogUpdate(messages) {
    // console.log(messages);
    let out = document.createDocumentFragment();
    messages.forEach(msgObj => out.appendChild(logMsgRender(msgObj)));
    id('commands-log').innerHTML = '';
    id('commands-log').appendChild(out);
}

function logMsgRender(msgObj) {
    const dataTime = document.createElement('div');
    dataTime.className = 'loge-datetime';
    dataTime.innerText = formatingTime(msgObj.date);

    const logMessage = document.createElement('div');
    logMessage.className = 'log-message';

    console.log(Object.keys(msgObj.message));
    for (let el in msgObj.message){
        const element = document.createElement('div');
        element.innerText = `${el} : ${msgObj.message[el]}`;
        logMessage.appendChild(element);
    }

    const div = document.createElement('div');
    div.appendChild(dataTime);
    div.appendChild(logMessage);
    return div;
}
import {msgInChatRender, allUpdate} from "./forUpdChat";
import {id} from "./usefulFunctions";

export function messageHandler(message) {
    if (message.hasOwnProperty('action')){
        actionCheck(message);
    } else {
        msgTextRendering(message);
    }
}

function msgTextRendering(message) {
    id('chat-window').insertAdjacentHTML("afterbegin", msgInChatRender(message));
}

function actionCheck(message) {
    switch (message.action) {
        case 'getClientsList':
            allUpdate(JSON.parse(message.message));
            break;
        case '' :

            break;
        default :
            console.log(`wrong action: ${message.action}`);
    }
}
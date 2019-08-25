import './css/userPanelNconfig.css';
import './css/configForm.css';
import './css/chatNlog.css';
import './css/messagesInChat.css';

import {wsControl} from "./js/WS";
import {
    addPersonsListeners,
    addChatConfigListener,
    addSendBtnListener,
    addRunCommand,
    addSortBtnListener
} from "./js/listeners";


addChatConfigListener();
addSortBtnListener();
addPersonsListeners();
addSendBtnListener();
addRunCommand();
wsControl();

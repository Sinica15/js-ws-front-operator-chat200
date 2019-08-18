import './css/userPanelNconfig.css';
import './css/configForm.css';
import './css/chatNlog.css';
import './css/messagesInChat.css';

import {wsControl} from "./js/WS";
import {addPersonsListeners, addChatConfigListener, addSendBtnListener, addRunCommand} from "./js/listeners";


addChatConfigListener();
addPersonsListeners();
addSendBtnListener();
addRunCommand();
wsControl();

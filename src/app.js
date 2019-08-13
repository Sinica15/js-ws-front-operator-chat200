import './css/userPanelNconfig.css';
import './css/configForm.css';
import './css/chatNlog.css';

import {wsControl} from "./js/WS";
import {addPersonsListeners, addChatConfigListener, addSendBtnListener} from "./js/listeners";


addChatConfigListener();
addPersonsListeners();
addSendBtnListener();
wsControl();

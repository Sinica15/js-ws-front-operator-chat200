import {id} from "./usefulFunctions";
import {messageHandler} from "./messageHandler";

let ws = wsConnect();

export function wsControl() {

    // id('chat-send').addEventListener('click', () => {
    //     ws.send('{"msgType":"service","action":"client test_1","message":"lalala"}');
    // });

}

function wsConnect() {
    //Establish the WebSocket connection and set up event handlers
    let port_corrector = 1; // 1 - for build, 5 - for dev
    if (location.port == 9000) port_corrector = 5;
    const PORT = +location.port + port_corrector;
    let ws = new WebSocket("ws://" + location.hostname + ":" + PORT + "/chat");
    console.log("connected");
    ws.onopen = () => {
        sendServiceMsg('registration', 'operator');
    };
    ws.onmessage = msg => messageHandler(JSON.parse(msg.data));
    ws.onclose = () => console.log("WebSocket connection closed");
    return ws;
}

export function sendServiceMsg(action, msg) {
    // console.log(action, msg);
    ws.send(
        JSON.stringify({
            msgType : "service",
            action : action,
            message : msg
        })
    );
}

export function sendMsg(msg) {
    ws.send(
        JSON.stringify({
            message : msg,
        })
    );
}


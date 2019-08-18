export let id = id => document.getElementById(id);

export function formatingTime(ms) {
    function addZero (time) {
        if (parseInt(time) < 10) return '0' + time;
        return time;
    }
    let date = new Date(ms);
    // console.log( '0' + date.getHours());
    let out = '';
    out += addZero(date.getHours()) + ':';
    out += addZero(date.getMinutes()) + ' ';
    if (date.getDay() == (new Date()).getDay() &&
        date.getMonth() == (new Date()).getMonth() &&
        date.getFullYear() == (new Date()).getFullYear()) {
        return out;
    }
    out += addZero(date.getDate()) + '.';
    out += addZero(date.getMonth());
    return out;
}
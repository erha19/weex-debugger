var maxReconnectCount = 10
var websocket
var channelId
var connectUrl
function send(message) {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(message))
    }
}
function connect() {
    websocket = new WebSocket('ws://' + location.host + '/page/entry')


    if (location.hash === '#new') {
        //new page disable get channelId from sessionStorage
        location.hash = ''
    }
    else {
        channelId = sessionStorage.getItem('channelId')
        connectUrl = sessionStorage.getItem('connectUrl')
    }

    websocket.onopen = function () {

        if (channelId) {
            initQrcode()
        }
        else {
            send({method: 'WxDebug.applyChannelId'})
        }
    }
    websocket.onmessage = function (event) {
        var message = JSON.parse(event.data)
        if (message.method == 'WxDebug.pushChannelId') {
            channelId = message.params.channelId
            connectUrl = message.params.connectUrl
            sessionStorage.setItem('channelId', channelId)
            sessionStorage.setItem('connectUrl', connectUrl)
            initQrcode()
        }
        else if (message.method == 'WxDebug.startDebugger') {

            if (channelId === message.params) {
                sessionStorage.removeItem('channelId')
                sessionStorage.removeItem('connectUrl')
                location.href = '/debug.html?channelId=' + message.params
            }
        }
        else if (message.method == 'WxDebug.prompt'&&channelId === message.params.channelId) {
            var delayed = 5000 + message.params.messageText.length / 6 * 1000
            toast(message.params.messageText.replace(/\n/g, '<br>'), delayed)

        }
    }
    websocket.onclose = function () {
        sessionStorage.removeItem('channelId')
        sessionStorage.removeItem('connectUrl')
        document.getElementById('qrcode').innerHTML = ''
        document.querySelector('.qrcode-wrap').className += '  loading-state'
        if (maxReconnectCount-- > 0) {
            setTimeout(connect, 3000)
        }
    }
}

function createQRCode(channelId, connectUrl) {
    document.getElementById('qrcode').innerHTML = ''
    new QRCode(document.getElementById('qrcode'), {
        text: connectUrl || `http:\/\/${location.host}/devtool_fake.html?_wx_devtool=ws:\/\/${location.host}/debugProxy/native/` + channelId,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#E0E0E0",
        correctLevel: QRCode.CorrectLevel.L
    })


}
document.querySelector('.new').onclick = function () {
    window.open(location.href.replace(/#.*$|$/, '#new'), '_blank')
}
var loadingSimulator=false
document.querySelector('#qrcode').onclick = function () {
    if (channelId&&!loadingSimulator) {
        loadingSimulator=true
        document.querySelector('.qrcode-wrap').className += '  loading-state'
        if(navigator.platform=='MacIntel') {
            send({method: 'WxDebug.simrun', params: channelId})
            //toast('starting simulator... ',10000)
        }
        else{
            toast('Just support ios simulator now!',5000)
        }

    }
}

document.querySelector('.help').onclick = function () {
    if (document.querySelector('.help').innerHTML === '?') {
        document.querySelector('.help').innerHTML = 'x'
        document.querySelector('.mask').style.animation = 'expand 0.6s ease 1 forwards'
        document.querySelector('.description b:nth-child(1)').style.animation = 'blink 0.3s ease 1.1s 2'
        // Size is diffrence between the same fontsize chinese and Engilsh
        if (navigator.language === 'zh-CN') {
            document.querySelector('.description b:nth-child(2)').style.animation = 'blink-and-translate-zh 1s ease 1.1s 1 forwards'
            document.querySelector('.scan-tips').style.animation = 'show 0.3s linear 2.1s 1 forwards'
            document.querySelector('.click-tips').style.animation = 'show 0.3s linear 2.1s 1 forwards'
        }
        else {
            document.querySelector('.description b:nth-child(2)').style.animation = 'blink-and-translate-en 1s ease 1.1s 1 forwards'
            document.querySelector('.scan-tips').style.animation = 'show-en 0.3s linear 2.1s 1 forwards'
            document.querySelector('.click-tips').style.animation = 'show-en 0.3s linear 2.1s 1 forwards'
        }
       }
    else {
        document.querySelector('.help').innerHTML = '?'
        document.querySelector('.mask').style.animation = 'collapse 0.6s ease 1'
        document.querySelector('.description b:nth-child(1)').style.animation = ''
        document.querySelector('.description b:nth-child(2)').style.animation = ''
        document.querySelector('.scan-tips').style.animation = ''
        document.querySelector('.click-tips').style.animation = ''

    }
}
var notFirst = localStorage.getItem('notFirst')

connect()

if (!notFirst) {
    setTimeout(function () {
        document.querySelector('.help').onclick()
    }, 1000)


    localStorage.setItem('notFirst', '1')
}
function initQrcode() {
    createQRCode(channelId, connectUrl)
    setTimeout(function(){
        document.querySelector('.qrcode-wrap').className='qrcode-wrap'
    },800)
}
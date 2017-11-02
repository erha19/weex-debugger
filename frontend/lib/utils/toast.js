/**
 * Created by exolution on 17/4/12.
 */
function toast(text, delayed, theme) {
    let noticeCtn = document.createElement('div')
    noticeCtn.className = "widget-notice " + (theme || '')
    noticeCtn.innerHTML = '<span>' + text + '</span>'
    document.body.appendChild(noticeCtn)
    if (delayed > 0) {
        setTimeout(function () {
            noticeCtn.className += ' disapear'
            setTimeout(function () {
                noticeCtn&&document.body.removeChild(noticeCtn)
                noticeCtn=null
            }, 500)
        }, delayed)
    }
    noticeCtn.onclick = function () {
        noticeCtn.className += ' disapear'
        setTimeout(function () {
            noticeCtn&&document.body.removeChild(noticeCtn)
            noticeCtn=null
        }, 500)
    }
}
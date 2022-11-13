export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    getRandomInt,
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}


function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// const colors = ['#ff9aa2', '#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#f9a52c', '#afefef']
// const labels = ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']
// const noteTypes = ['txt', 'img', 'video', 'todos']
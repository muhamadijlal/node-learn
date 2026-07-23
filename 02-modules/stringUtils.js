function kapital(str) {
    return str.toUpperCase();
}

function balik(str) {
    return str.split('').reverse().join('');
}

function hitungKata(str) {
    return str.split(' ').length;
}

module.exports = { kapital, balik, hitungKata };

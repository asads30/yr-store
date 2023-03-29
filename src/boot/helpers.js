export function getId() {
    return 'fefc4f1e4705752a99644bd7769776e5049303a4c35131a512bedeaca59b3cd5'
}

function setId(id) {
    localStorage.setItem('id_store', id)
}

function getInit() {
    return localStorage.getItem('init_data')
}

function setInit(data) {
    localStorage.setItem('init_data', JSON.stringify(data))
}
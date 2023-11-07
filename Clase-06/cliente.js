
const host = 'localhost'
const port = '8080'
const path = '/profes'
const query = 'rol=tutor'

const url = `http://${host}:${port}${path}?${query}`

console.log(url)

const responde = await fetch(url)
const content = await responde.json()
console.log(content)



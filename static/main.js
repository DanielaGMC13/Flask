const carForm = document.querySelector('#bicicletaForm');


let bicicletas = []


window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/compraBicicleta');
    const data = await response.json()
    bicicletas = data
    console.log(data)
    rederBicicleta(bicicletas)
})

bicicletaForm.addEventListener("submit", async e => {
    e.preventDefault()

    const nombre = bicicletaForm["nombre"].value;
    const apellido = bicicletaForm["apellido"].value;
    const fecha = bicicletaForm["fecha"].value;
    const marca = bicicletaForm["marca"].value;

    console.log(nombre, apellido, fecha, marca)

    const response = await fetch('/api/compraBicicleta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            apellido,
            fecha,
            marca,
        })
    })

    const data = await response.json()
    console.log(data)
    bicicletas.push(data)
    rederBicicleta(bicicletas)
    bicicletaForm.reset();
})

function rederBicicleta(bicicletas) {
    const bicicletaList = document.querySelector('#bicicletaList')
    bicicletaList.innerHTML = ''

    bicicletas.forEach(bicicleta => {
        const biciItem = document.createElement('li')
        biciItem.classList = 'list-group-item'
        biciItem.innerHTML = `
        <h3>${bicicleta.nombre} ${bicicleta.apellido}</h3>
        
        <p>${bicicleta.fecha}</p>
        <p>${bicicleta.marca}</p>
        `
        console.log(biciItem)
        bicicletaList.append(biciItem)
    })


}


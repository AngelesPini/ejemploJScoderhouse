const personajesHTML = document.getElementById('api')

const url = 'https://rickandmortyapi.com/api/character'

fetch(url)
	.then((res) => res.json())
	.then((data) => {
    let characters = ""
        console.log(data)
		data.results.map((i)=>{
            characters += `    
            <div class="card elemento m-2" style="width: 18rem;">

                <div class="card-body">
                <h5 class="card-title">${i.id}</h5>
                <p class="card-text">Apodo: ${i.name}</p>
                <p class="card-text">Casa: ${i.species}</p>
                </div>
                </div>`
            personajesHTML.innerHTML = characters;

        })
	})
	.catch((e) => console.log(e)) 
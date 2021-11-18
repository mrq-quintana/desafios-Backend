document.addEventListener(`submit`, event=>{
    event.preventDefault();
    let form = document.querySelector(`#formProduct`);
        let data = new FormData(form);
        let objAgregar={
            title: data.get('title'),
            price: data.get('price'),
            image: data.get('image')
        }
        fetch('http://localhost:8080/api/productos', {
            method:'POST',
            body: JSON.stringify(objAgregar),
            headers: {'Content-type':'application/json'}
        })
        .then(res=>{
            return res.json();
        })
        .then(json=>{
            return console.log(json);
        })
    })
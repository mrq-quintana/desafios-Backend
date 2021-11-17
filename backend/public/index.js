document.addEventListener(`submit`, event=>{
    event.preventDefault();
    let forma = document.querySelector(`#formProduct`);
        let data = new FormData(forma);
        console.log(forma);
        fetch('http://localhost:8080/api/productos', {
            method:'POST',
            body: data,
        })
        .then(res=>{
            return res.json();
        })
        .then(json=>{
            return console.log(json);
        })
    })
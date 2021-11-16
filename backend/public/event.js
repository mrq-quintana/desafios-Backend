document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.querySelector('#productForm');
    let data = new FormData(form);
    fetch('http://localhost:8080/api/productos/',{
        method:'POST',
        body:data
    })
    .then(res=>{
        return console.log(res);
    })
    .then(json=>{
        return console.log(json);
    })
})
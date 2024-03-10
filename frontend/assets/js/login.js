document.querySelector("#submit_form").addEventListener('click', (e)=> {
    e.preventDefault()
    
    let user = document.querySelector("#username").value
    let pw = document.querySelector('#password').value

    fetch(`http://localhost:3000/login/`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify({ user, pw })
    })
    .then(response => {
        if(response.status == 200){
            return response.json()
        }else{
            throw new Error()
        }
    })
    .then(data => {
        const id_user = data.id;
        localStorage.setItem('id_user', id_user);
        window.location.href = window.location.origin + "/index.html"
    })
    .catch((e) => {
        alert(e + ' log in incorreto')
    })

})


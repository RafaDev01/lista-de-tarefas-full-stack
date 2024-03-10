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
            window.location.href = window.location.origin + "/index.html"
            return response.json()
        }else{
            throw new Error()
        }
    })
    .catch((e) => {
        alert(e + ' log in incorreto')
    })

})
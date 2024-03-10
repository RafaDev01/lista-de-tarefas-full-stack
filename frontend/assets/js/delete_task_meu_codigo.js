let id_task = null

window.onload = () =>{
    //get id_task
    
    const url = new URL(window.location.href)
    id_task = url.searchParams.get('id_task')
    console.log(id_task)

    //get task data
    fetch(`http://localhost:3000/user/tasks/get_task/${id_task}/`)
        .then(response => {
            if(response.status == 200){
                return response.json()
            }else{
                console.log('erro')
            }
        })
        .then(task => {
            document.querySelector("#text_task_text").value = task[0].task_text
        })
}

document.querySelector("#btn_deletar").addEventListener('click', () => {
    /*
    let task_text = document.querySelector("#text_task_text").value
    let error = document.querySelector('#error')

    //check if input is empty
    if(task_text == null || task_text == ''){
        error.textContent = "Preencha o campo de texto."
        error.classList.remove('d-none')

        console.log('erro')
        return
    }

    //check if length > 100 
    if(task_text.length > 100){

        error.textContent = "O texto deve ter menos de 100 caracteres."
        error.classList.remove('d-none')

        return
    }*/

    //delete new task in database
    fetch(`http://localhost:3000/user/tasks/delete_task/`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify({ id_task })
    })
    .then(response => {
        if(response.status == 200){
            return response.json()
        }
    })

    //redirect to homepage
    window.location.href = window.location.origin + "/index.html"
})
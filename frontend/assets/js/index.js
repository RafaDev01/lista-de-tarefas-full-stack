//javascript do index.html

let id = 1

window.onload = () =>{

    get_username(id)
    get_user_tasks(id)

}

async function get_username(id){
    
    await fetch(`http://localhost:3000/user/${id}`)
    .then(response => {
        if(response.status === 200){
            return response.json()
        }else{
            console.log('ERRO')
        }
    })
    .then(dados => {
        if(!dados.length){
            console.log("ERRO")
        }else{
            document.querySelector('#username').textContent = dados[0].username
        }
    })

}

async function get_user_tasks(id){
    
    await fetch(`http://localhost:3000/user/${id}/tasks`)
    .then(response => {
        if(response.status === 200){
            return response.json()
        }else{
            console.log('ERRO')
        }
    })
    .then(tarefas => {
        if(!tarefas.length){
            document.querySelector("#no_tasks").classList.remove("d-none")
            document.querySelector(".container_tarefas").classList.add("d-none")
        }else{
            document.querySelector("#tasks_container").innerHTML = null
            
            tarefas.forEach((tarefa) => {
                let html = 
                `
                    <div class="col-12 border border-secundary rounded p-3 shadow">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="d-flex align-items-center">
                                    <h5 class="me-3 text-info"><i class="fa-solid fa-circle-chevron-right"></i></h5>
                                    <h5>${tarefa.task_text}</h5>
                                </div>
                            </div>
                            <div class="col-2">
                                <select id="task_status-${tarefa.id}" class="form-select p-2">
                                    <option value="new" ${ tarefa.task_status == "new" ? 'selected' : '' }>New</option>
                                    <option value="in progress"${ tarefa.task_status == "in progress" ? 'selected' : '' }>In progress</option>
                                    <option value="canceled" ${ tarefa.task_status == "canceled" ? 'selected' : '' }>Canceled</option>
                                    <option value="done" ${ tarefa.task_status == "done" ? 'selected' : '' }>Done</option>
                                </select>
                            </div>
                            <div class="col-1 text-end"><span class="edit_link" data-id-task="${tarefa.id}"><i class="fa-regular fa-pen-to-square text-end me-2"></i>Edit</span></div>
                            <div class="col-1 text-end text-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</div>
                        </div>
                    </div>
                `

                let new_task = document.createElement('div')
                new_task.classList.add("row", "mb-3")
                new_task.innerHTML = html

                document.querySelector("#tasks_container").appendChild(new_task)
            });

            document.querySelector("#no_tasks").classList.add("d-none")
            document.querySelector("#total_tasks").textContent = tarefas.length
            document.querySelector(".container_tarefas").classList.remove("d-none")
        }
    })
}
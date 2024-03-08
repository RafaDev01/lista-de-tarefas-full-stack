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

document.querySelector("").addEventListener('click', () => {

    

})
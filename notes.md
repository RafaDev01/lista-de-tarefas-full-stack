# LISTA DE TAREFAS

Uma aplicação front end com HTML, CSS e JS puro para gerenciar tarefas.
No backend vamos ter uma API NodeJS + Express + MySQL para servir o frontend.

# BASE DE DADOS

    users
        id
        username
        password
        created_at
        updated_at

    tasks
        id
        id_user
        task_text
        task_status(new | in progress | canceled | done)
        created_at
        updated_at

# TAREFAS A DESENVOLVER NO PROJETO

    FEITO > Criar a estrutura inicial
    FEITO - base do front end(html, css, js, bootstrap)
    FEITO - base do backend (node + express + mysql) com uma resposta padrão

    FEITO > no frontend
    FEITO - páginas necessárias para a navegação no app.
        - pequenos teste de comunicação entre front e backend - utilização de Ajax(XMLhttprequest | fetch API)

    FEITO - estrutura base de cada página
    FEITO bootstrap (slate) bootswatch
    FEITO fontawesome
    
    FEITO - ver tarefas
        titulo
        filtro para escolher que tarefas queremos ver(select)
        botao para adicionar tarefas
        (mensagem caso não exista tarefas)
        caixa para tarefas
            - possibilidade de alternar o status, editar tarefa e eliminar tarefa
        parágrafo com o total de tarefas disponíveis(de acordo com o filtro)

    - adicionar tarefas
        input:text com texto da tarefa
        botão para cancelar
        botão para submeter tarefa
    
    - editar tarefa
        input:text para editar o texto da tarefa
        botão para cancelar
        botão para submeter alteração

    Backend
    Criar um servidor NodeJS + Express + MySQL
    criar um endpoint inicial - testar comunicações

    (eleminiar será feito com um modal)
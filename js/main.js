const inputTarefa = document.querySelector('#input-tarefa');
const btnTarefa = document.querySelector('#btn-tarefa');
const listaTarefas = document.querySelector('#listaTarefas');

function criaLista() {
    const li = document.createElement('li');
    return li;
}

function criaTarefa(textoInput) {
    const li = criaLista();
    li.className = 'list-group-item';
    li.innerHTML = textoInput;
    listaTarefas.appendChild(li);
    criaButton(li);
    saveTarefas();
}

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaButton(li) {
    li.innerHTML += ' ';
    const btn = document.createElement('button');
    btn.innerHTML = 'X';
    btn.className = 'btn btn-danger float-right btn-sm';
    btn.setAttribute('id', 'button-apagar');
    li.appendChild(btn);
}

function saveTarefas() {
    const tarefas = listaTarefas.querySelectorAll('li');
    const arrayTarefas = [];

    for (let i of tarefas) {
        let tarefaText = i.innerText;
        tarefaText = tarefaText.replace('X', '').trim(); // tirando o texto 'X' do button
        arrayTarefas.push(tarefaText);
    }
    const tarefasJSON = JSON.stringify(arrayTarefas); // convertendo para JSON
    localStorage.setItem('tarefas', tarefasJSON); // salvando os strings(JSON) no local storage
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const arrayTarefas = JSON.parse(tarefas); // passando de JSON para obj
    console.log(arrayTarefas);

    for(let i of arrayTarefas) {
        criaTarefa(i);
    }
} 
addTarefasSalvas()

btnTarefa.addEventListener('click', function (e) {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value);
    limpaInput();
});

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value);
        limpaInput();
        
    }
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.id == ('button-apagar')) {
        el.parentElement.remove(); 
        saveTarefas();    
    }
    
});
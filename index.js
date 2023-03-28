const axios = require('./api.js');
const prompt = require('prompt-sync')();

main();

async function main() {

var op;
  
  do{
    console.log(`Sistema de cadastro de Veículos
                
                1 - Cadastrar nova tarefa
                2 - Alterar uma tarefa
                3 - Marcar tarefa como concluída
                4 - Excluir uma tarefa
                5 - Listar tarefas pendentes
                6 - Listar tarefas concluídas
                7 - Listar todas as tarefas
                0 - Sair do sistema
                `);

    op = prompt('Digite a opção desejada: ');

    switch (op){
      case '1':
        await cadastrarTarefa();
        prompt(`Enter para continuar...`);
        console.clear();
        break;

      case '2':
        await alterarTarefa();
        prompt(`Enter para continuar...`);
        console.clear();
        break;

      case '3':
        await marcarTarefaConcluida();
        prompt(`Enter para continuar...`);
        console.clear();
        break;

      case '4':
        await excluirTarefa();
        prompt(`Enter para continuar...`);
        console.clear();
        break;

      case '5':
        await listarTarefasPendentes();;
        prompt(`Enter para continuar...`);
        console.clear();
        break;

      case '6':
        await listarTarefasConcluidas();
        prompt(`Enter para continuar...`);
        console.clear();
        break;

      case '7':
        await listarTodasTarefas();
        prompt(`Enter para continuar...`);
        console.clear();
        break;

      case '0':
        console.log('Obrigado por usar o Sistema. Até mais!');
        break;
      default:
        console.log('Entrada inválida...');
        break;
    }
  }while(op !== '0');
};

async function cadastrarTarefa() {
  var descricao = prompt('Digite a descrição da tarefa: ');

  try {
    await axios.api.post('/tarefas', {
      descricao: descricao,
      status: 'Pendente'
    });

    console.log('Tarefa cadastrada com sucesso!');
  }catch(err){
    console.log('Erro ao cadastrar a tarefa: ', err.message);
  }
};

async function alterarTarefa() {
  var tarefa = await obterTodasTarefas();
  console.table(tarefa);
  
  var id = Number(prompt('Digite o ID da tarefa que será alterada: '));
  var descricao = prompt('Digite a nova descrição para a tarefa: ');

  var tarefa = await obterTarefa(id);

  try{
    await axios.api.put(`/tarefas/${id}`, {
      id: id,
      descricao: descricao,
      status: tarefa.status
    });

    console.log('Tarefa alterada com sucesso!');
  }catch(err){
    console.log('Erro ao alterar tarefa: ', err.message);
  }
};

async function marcarTarefaConcluida(){
  var tarefa = await obterTodasTarefas();
  console.table(tarefa);
  
  var id = Number(prompt("Digitre o ID da tarefa que será concluída: "));
  var tarefa = await obterTarefa(id);

  try{
    await axios.api.put(`/tarefas/${id}`, {
      id: id,
      descricao: tarefa.descricao,
      status: 'Concluída'
    });

    console.log('Tarefa concluída com sucesso!');
  }catch(err){
    console.log('Erro ao concluir tarefa: ', err.message);
  }
};

async function excluirTarefa(){
  var tarefa = await obterTodasTarefas();
  console.table(tarefa);
  
  var id = Number(prompt('Digite o Id da tarefa que será excluída: '));

  try {
    await axios.api.delete(`/tarefas/${id}`);

    console.log('Tarefa excluída com sucesso!');
  }catch(err){
    console.log('Erro ao excluir tarefa: ', err.message);
  }
};

async function listarTarefasPendentes(){
  
  try{
    var tarefa = await axios.api.get('/tarefas');
    var lista = tarefa.data.filter((item) => item.status === 'Pendente');
    
    console.table(lista);
    
  }catch(err){
    console.log('Erro ao obter as tarefas Pendentes', err.message);
  }
};

async function listarTarefasConcluidas(){
  
  try{
    var tarefa = await axios.api.get('/tarefas');
    var lista = tarefa.data.filter((item) => item.status === 'Concluída');
    
    console.table(lista);
    
  }catch(err){
    console.log('Erro ao obter as tarefas Concluídas', err.message);
  }
};

async function listarTodasTarefas(){
  
  var tarefa = await obterTodasTarefas();

  try{
    console.table(tarefa);
    
  }catch(err){
    console.log('Erro ao listar todas as tarefas: ', err.message);
  }
};

async function obterTarefa(id){
  
  var response = await axios.api.get(`/tarefas/${id}`);
  
  var tarefa = response.data;
  
  return tarefa;
};

async function obterTodasTarefas(){
  
  var response = await axios.api.get('/tarefas');
  
  var tarefa = response.data;
  
  return tarefa;
};
import { TodoList } from "../classes";
import { TodoClass } from "../classes/todo.class";


//referencer in html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('.clear-completed');
const divFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

//objeto inicializado
const objList = new TodoList();

export const createTodoHTML= ( todo )=>{
    const htmlTodo = `
            <li class="${(todo.completed)?'completed ':''}" data-id="${ todo.id }">
                <div class="view">
                    <input class="toggle" type="checkbox" ${(todo.completed)?'checked':''}>
                    <label>${ todo.task }</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li>    
    `
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

}

//listeners
txtInput.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13 && (txtInput.value)!==""){
        const newValue = new TodoClass( txtInput.value );
        objList.newTodo(newValue);
        createTodoHTML(newValue);
        txtInput.value="";        
    };
});

divTodoList.addEventListener('click',(e)=>{
    const activeElement = e.target.localName;
    const currentElement = e.target.parentElement.parentElement;
    const currentElementID = currentElement.getAttribute('data-id');

    if (activeElement=='input'){
        objList.checkCompleted(currentElementID);
        currentElement.classList.toggle('completed')
    } 
    
    if (activeElement=='button'){
        objList.deleteTodo(currentElementID);
        divTodoList.removeChild(currentElement);
    } 
});

btnClearCompleted.addEventListener('click',(e)=>{

    const markedElements = divTodoList.querySelectorAll('li.completed');

    for (const markedElement of markedElements) {
        divTodoList.removeChild(markedElement);
    }

    objList.deleteCompleted();
    
    
});

divFilters.addEventListener('click', (e)=>{
    
    const currentFilter = e.target.text;

    if(!currentFilter)  return ;

    anchorFilters.forEach(element => { element.classList.remove('selected') });
    e.target.classList.add('selected');


    for (const element of divTodoList.children) {

        element.classList.remove('hidden');  
        const completedElement = element.classList.contains('completed'); 

        switch ( currentFilter ) {
            case 'Pendientes':           
                !completedElement && element.classList.add('hidden');
                break;
            case 'Completados':
                completedElement && element.classList.add('hidden');
                break;
 
            default:
                break;
        }
        

    }




});



//cargando elementos previos

/* (objList.todos).forEach(element => {
    createTodoHTML(element)
}); */

//si solo hay un argumento, lo de arriba se puede hacer asi:
(objList.todos).forEach(createTodoHTML);
//se esta tomando el primer return de foreach y se envia al primer parametro de la funcion createTodoHTML asi no se especifique entre parentesis

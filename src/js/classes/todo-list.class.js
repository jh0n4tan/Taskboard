import { TodoClass } from "./todo.class";

export class TodoList{

    constructor(){
        this.todos = []
        this.LoadFromLocalStorage();
    }

    newTodo( task ){
        this.todos.push( task );
        this.saveOnLocalStorage();
    }

    deleteTodo( id ){
        this.todos = this.todos.filter( x => x.id != id );
        this.saveOnLocalStorage();
    }

    checkCompleted( id ){
        let col = 0;
        this.todos.forEach(x => {
            (x.id == id)
            &&(this.todos[col].completed = !this.todos[col].completed);
            col++;
        }); 
        this.saveOnLocalStorage();       
    }

    deleteCompleted(){
        this.todos = this.todos.filter( x => !x.completed );
        this.saveOnLocalStorage();
    }

    saveOnLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    LoadFromLocalStorage(){

        const savedData = localStorage.getItem('todo') || '';      
        (savedData != '') && (this.todos = JSON.parse(savedData));
        
        /*this.todos = this.todos.map( obj =>
            TodoClass.fromLocalStorageJSONtoInstance(obj));
        } */
        
        this.todos = this.todos.map( TodoClass.fromLocalStorageJSONtoInstance );
    }

}
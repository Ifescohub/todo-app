const todoContainer = document.querySelector(".todo-container");
const completedContainer = document.querySelector(".todo-completed")
const remaining = document.querySelector(".remaining");

const filterContainer = document.querySelector(".filter-list");
let todoArray = [];
let completedArray = [];

let count = 0;


// FOMATTING MODE SWITCH
document.querySelector(".mode-toggle")
    .addEventListener("click", ()=>{
        document.documentElement.classList.toggle("light")
})


//Getting items stored in the local storage
const locallyStoredTodo = JSON.parse(localStorage.getItem("todos"));

// Rendering items in the local storage 
function finalRender(){
    if (locallyStoredTodo){
        todoArray = locallyStoredTodo;
        renderTodo(todoArray); 
    }
}
finalRender();


//To clear all itmes/leads from the page and local storage
document.querySelector(".clear-all").addEventListener("click", ()=>{
    localStorage.clear();
    todoArray = [];
    increaseCount();
    renderTodo(todoArray); 
});


// Creating the todo Template 
function template(value){
    return `
        <div class="todo-list">
            <div class="checkbox"></div>
            <p class="list">${value}</p>
            <img class="delete" src="images/icon-cross.svg" alt="">
        </div>
    `
}


function renderTodo(items){
    let todoList = "";

    for (let i in items){
        todoList += template(items[i])
    }
    // items.map(item => {
    //     todoList += template(item);
        
    // });
    
    todoContainer.innerHTML = todoList;
}



document.forms["form"].onsubmit = (e)=>{
    e.preventDefault()
    const input = document.form.input.value;


    if (input.length){
        todoArray.push(input);
        increaseCount();
        console.log(todoArray.indexOf(input))
    }
  
    localStorage.setItem("todos", JSON.stringify(todoArray));
    renderTodo(todoArray)
    
    
    form.reset();
}



function increaseCount(){
    count = todoArray.length;
    remaining.textContent = `${count} items left`;
}
increaseCount();

function buttonFormat(){
    todoContainer.addEventListener("click", (e)=>{
        if (e.target.classList.contains("delete")){
            let list = e.target.parentNode;
            let textIndex = todoArray.indexOf(list.children[1].textContent);
    
            
            locallyStoredTodo.splice(textIndex, 1)
            localStorage.setItem("todos", JSON.stringify(todoArray));
            todoContainer.removeChild(list);
            increaseCount();
        }
    
        if (e.target.classList.contains("checkbox")){
            let list = e.target.parentNode;
            let checkbox = list.children[0]
            let textEL = list.children[1]
            let textIndex = todoArray.indexOf(textEL.textContent);
            
            checkbox.classList.toggle("checked");
            textEL.classList.toggle("active");
    
            if(textEL.classList.contains("active")){
                completedArray.push(textEL.textContent);
            }else{
                completedArray.splice(completedArray.indexOf(textEL.textContent), 1)
            }
        }
    })
}

buttonFormat();

function renderfilter(){
    filterContainer.addEventListener("click", (e)=>{
        filterContainer.querySelectorAll("p")
            .forEach(child => child.classList.remove("current"))
        e.target.classList.add("current");
    
        let lists = todoContainer.querySelectorAll(".todo-list");
            
    
        if (e.target.classList.contains("allEl")){
            lists.forEach(list => list.style.display = "flex");
        }
    
    
        if (e.target.classList.contains("activeEl")){
            
            lists.forEach(list => {
                let checkbox = list.children[0];
                if(checkbox.classList.contains("checked")){
                    list.style.display = "none"
                }else{
                    list.style.display = "flex"
                }
            })
        }
      
    
        if (e.target.classList.contains("completedEl")){   
            lists.forEach(list => {
                let checkbox = list.children[0];
                if(!checkbox.classList.contains("checked")){
                    list.style.display = "none"
                }else{
                    list.style.display = "flex"
                }
            })  
        }
    })
}


renderfilter();

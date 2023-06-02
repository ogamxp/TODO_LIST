let data = [
  {
    id: 1,
    title: 'Najibulloh',
    desc: 'Teacher',
    complete: false,
  },
  {
    id: 2,
    title: 'Ogabek',
    desc: 'Assistant',
    complete: false,
  },
  {
    id: 3,
    title: 'Shaykh',
    desc: 'Student',
    complete: false,
  },
]
let box = document.querySelector('.right')
let inp1 = document.querySelector('.inp1')
let inpEdit1 = document.querySelector('.inpEdit1')
let inp2 = document.querySelector('.inp2')
let inpEdit2 = document.querySelector('.inpEdit2')
let btnAdd = document.querySelector('.btnAdd')
let btnEdit = document.querySelector('.btnEdit')
let hide = document.querySelector('.hide')
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var btn = document.querySelector('#add')
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close")[1];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}
span1.onclick = function() {
  modal2.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal || event.target == modal2) {
    modal.style.display = "none";
    modal2.style.display = "none";
  }
}


function addTodo () {
  let newObj = {
    id: new Date().getTime(),
    title: inp1.value,
    desc: inp2.value,
    complete: false,
  }
  data.push(newObj);
  get(data)
  modal.style.display = "none"
  inp1.value = ''
  inp2.value = ''
}
btnAdd.onclick = addTodo;

function doneTodo(id) {
  let newData = data.map((e) => {
    if (e.id == id) {
      e.complete = !e.complete;
    }
    return e
  })

  get(newData)
}

function deleteTodo(id) {
  data = data.filter((e) => {
    return e.id != id
  })
  get(data)
}

let idx = null
function editTodo (id) {
  idx = id
  let user = data.find((e) => e.id == idx)
  inpEdit1.value = user.title
  inpEdit2.value = user.desc

  modal2.style.display = 'block'
}

function editUser () {
  let newData = data.map((e) => {
    if (e.id == idx) {
      e.title = inpEdit1.value
      e.desc = inpEdit2.value
    }
    return e
  })
  
  modal2.style.display = 'none'
  get(newData)
}

btnEdit.onclick = editUser

hide.onclick = (event) => {
  let hideDone = [...data]

  if (event.target.checked) {
    hideDone = hideDone.filter((e) => {
      return e.complete != true
    })
    get(hideDone)
  }

  else{
    get(hideDone)
  }
}

function get (newData) {
  box.innerHTML = ''
  newData.forEach((e) => {
    let div = document.createElement('div')
    div.classList.add('todo')

    let h1 = document.createElement('h1')
    h1.innerHTML = e.title
    if (e.complete == true) {
      h1.style.textDecoration = 'line-through'
    }

    let p = document.createElement('p')
    p.innerHTML = e.desc
    
    let editIcon = document.createElement('i')
    editIcon.classList.add('fa-solid')
    editIcon.classList.add('fa-pen')
    editIcon.style.cursor = 'pointer'
    editIcon.onclick = () => {
      editTodo(e.id)
    }
    
    let deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-sharp')
    deleteIcon.classList.add('fa-solid')
    deleteIcon.classList.add('fa-trash')
    deleteIcon.style.cursor = 'pointer'
    deleteIcon.onclick = () => {
      deleteTodo(e.id)
    }
    
    let done = document.createElement('input')
    done.type = 'checkbox'
    done.style.cursor = 'pointer'
    done.checked = e.complete
    done.onclick = () => {
      doneTodo(e.id)
    }
    
    div.appendChild(h1)
    div.appendChild(p)
    div.appendChild(editIcon)
    div.appendChild(deleteIcon)
    div.appendChild(done)
    box.appendChild(div)
  })
}

get(data)
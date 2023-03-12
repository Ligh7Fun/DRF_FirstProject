"use strict";



async function postList() {
  const response = await fetch("http://192.168.1.70:8000/api/v1/womenlist/");
  const data = await response.json();
  return data.posts;
}

// Функция для получения списка категорий
async function catList() {
  const response = await fetch("http://192.168.1.70:8000/api/v1/categorylist/");
  const data = await response.json();
  return data.cats;
}

// Функция для вывода списка в таблицу
async function showList() {
  const posts = await postList();
  const cats = await catList();

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  const header1 = document.createElement("th");
  header1.innerText = "ID";
  headerRow.appendChild(header1);
  const header2 = document.createElement("th");
  header2.innerText = "Title";
  headerRow.appendChild(header2);
  const header3 = document.createElement("th");
  header3.innerText = "Content";
  headerRow.appendChild(header3);
  const header4 = document.createElement("th");
  header4.innerText = "Category";
  headerRow.appendChild(header4);
  table.appendChild(headerRow);

  posts.forEach((post) => {
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    idCell.innerText = post.id;
    row.appendChild(idCell);
    const titleCell = document.createElement("td");
    titleCell.innerText = post.title;
    row.appendChild(titleCell);
    const contentCell = document.createElement("td");
    contentCell.innerText = post.content;
    row.appendChild(contentCell);
    const catName = cats.find((cat) => cat.id === post.cat_id)?.name;
    const catCell = document.createElement("td");
    catCell.innerText = catName ?? "";
    row.appendChild(catCell);
    table.appendChild(row);
  });

  document.body.appendChild(table);
}

async function addPost(post) {
    const response = await fetch('http://192.168.1.70:8000/api/v1/womenlist/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    const data = await response.json();
    console.log(data);
}

async function addCats(cat) {
    const response = await fetch('http://192.168.1.70:8000/api/v1/categorylist/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
    });
    const data = await response.json();
    console.log(data);
}

 // Получаем список категорий и заполняем элемент <select> с id="cat_id"
 async function showAddPostForm() {
    const catsResponse = await fetch('http://192.168.1.70:8000/api/v1/categorylist/');
    const catsData = await catsResponse.json();

    let catSelect = document.getElementById('cat_id');

    // добавляем опции выбора категории в элемент <select>
    catsData.cats.forEach(cat => {
        let option = document.createElement('option');
        option.value = cat.id;
        option.text = cat.name;
        catSelect.appendChild(option);
    });

    // показываем форму добавления поста
    document.getElementById('add-post-form').style.display = 'block';
}

// Обработчик отправки формы добавления поста
document.getElementById('add-post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const post = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        cat_id: document.getElementById('cat_id').value
    };

    addPost(post);
});

const addPostForm = document.querySelector('#add-post-form');
addPostForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = addPostForm.elements.title.value;
    const content = addPostForm.elements.content.value;
    const cat_id = addPostForm.elements.cat_id.value;
    addPost(title, content, cat_id);
});

const addCatForm = document.querySelector('#add-cat-form');
addCatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cat_name = addCatForm.elements.cat_name.value;
    addCats(cat_name);
});

showList();

let popa = document.querySelector("#add-post-form");

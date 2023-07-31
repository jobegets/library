// script.js

let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages`;
    };
    this.index = myLibrary.indexOf(this);
    this.read = false;  
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function toggleReadStatus(book){
    result = '';
    if (book.read == false){
        book.read = true;
        result = 'Read';
    }
    else{
        book.read = false;
        result = 'Not Read'
    }
    return result;
    
}


function displayBooks() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${myLibrary.length}, 1fr)`;
    for (let i = 0; i < myLibrary.length; i++) {
        let cell = document.createElement('div');
        let book = myLibrary[i];
        cell.textContent = book.info();
        cell.style.border = '1px solid black';
        // Add remove button
        let removeBtn = document.createElement('button');
        removeBtn.addEventListener("click", ()=>{
            container.removeChild(cell);
            myLibrary.splice(cell.index,1);
        });
        removeBtn.innerHTML = "DELETE";
        cell.appendChild(removeBtn);

        // Add read status button
        let readBtn = document.createElement('button');
        readBtn.innerHTML = "Not Read";
        readBtn.addEventListener("click", ()=>{

            readBtn.innerHTML = toggleReadStatus(book);
            console.log(book.read);
        });

        cell.appendChild(readBtn);
        container.appendChild(cell);
        
    }
}

const addBookButton = document.querySelector('.add-book-button');
const bookForm = document.querySelector('#bookform');

addBookButton.addEventListener('click', () => {
    // Toggle form visibility
    if (bookForm.style.display === 'none') {
        bookForm.style.display = 'block';
    } else {
        bookForm.style.display = 'none';
    }
});

const submitForm = document.querySelector('#bookform');
submitForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    console.log(title);

    let book = new Book(title, author, pages);
    addBookToLibrary(book);

    document.getElementById('bookform').reset();
    document.getElementById('bookform').style.display = 'none';
});
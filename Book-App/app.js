class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBook(){

        const books = Store.getBooks();
        

        // const storedBooks = [
        //     {
        //         title:"Da Vinci Code",
        //         author:"Brown, Dan",
        //         isbn:'13132465'
        //     },
        //     {
        //         title:"Harry Potter and the Philosopher's Stone",
        //         author:"Rowling, J.K.",
        //         isbn:'98746261'
        //     }
        // ]
        // const books = storedBooks;

        books.forEach((book) => UI.AddBookToList(book));
    }

    static AddBookToList(book){
        const list = document.querySelector("#book-list");

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href ="#" class ="danger-btn delete">X</a></td>
        `
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);
        setTimeout(()=>{
            document.querySelector(".alert").remove()
        },2500)
    }
    static clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }

}


// Handles Storage
class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books' , JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
    });

    localStorage.setItem('books', JSON.stringify(books));
    
    }
}

// Display Book
document.addEventListener("DOMContentLoaded",UI.displayBook);

// Add a Book
document.querySelector("#book-form").addEventListener("submit",(e) =>{
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title===''|| author===''|| isbn===''){
        
        UI.showAlert("* Please fill all the fields","danger")

    }else{

        const book = new Book(title,author,isbn);
    
        UI.AddBookToList(book);

        Store.addBook(book);

        UI.showAlert("Book has been Added", "success");
        
        UI.clearFields();
    }

})


// Remove a Book
document.querySelector("#book-list").addEventListener('click',(e)=>{

    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert("Book Removed",'removed')
})

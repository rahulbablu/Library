let myLibrary = [];

//Object Constructor
function Book(title,author,pages,read){
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
  }

  //function for adding a new book to the array/library
  function addBookToLibrary(title, author,pages,read){
    let book = new Book(title, author,pages,read);
    myLibrary.push(book);
    displayBooksOnPage();
  }
  
  //Function to display library array to cards
  function displayBooksOnPage(){
    const books = document.querySelector(".books");

    //Remove all Previously displayed cards before I loop over array again
    const removeDivs = document.querySelectorAll(".card");
    for(let i=0;i<removeDivs.length;i++){
        removeDivs[i].remove();
    }

    //Loop over the library array and display to the cards
    let index = 0;
    myLibrary.forEach(myLibraries =>{
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        //Create remove book button and add class attribute for each array card
        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book-button");
        removeBookButton.textContent = "Remove From Library";

        //Link the data attribute of the remove button  to the array and card
        removeBookButton.dataset.linkedArray = index;
        card.appendChild(removeBookButton);

        //Start even listener/remove array item from array and card from parent div via datalink
        removeBookButton.addEventListener("click", removeBookFromLibrary);

        function removeBookFromLibrary(){
            let retrieveBookToRemove = removeBookButton.dataset.linkedArray;
            myLibrary.splice(parseInt(retrieveBookToRemove), 1);
            card.remove();
            displayBooksOnPage();
        }

        //Create read status button and add class attribute for each array card
        const readStatusButton = document.createElement("button");
        readStatusButton.classList.add("read-status-button");
        readStatusButton.textContent = "Read Status";

        //Link the data attribute of thr toggle read button to the array and card
        readStatusButton.dataset.linkedArray = index;
        card.appendChild(readStatusButton);

        //Create event listener/toggle logic for array objects prototypr for read status change
        readStatusButton.addEventListener("click", toggleReadStatus);

        function toggleReadStatus(){
            let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
            Book.prototype = Object.create(Book.prototype);
            const toggleBook = new Book();

            //Run check to see what read value is present to toggle from
            if((myLibrary[parseInt(retrieveBookToToggle)].read) == "Yes"){
                toggleBook.read = "No";
                myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
            }else if((myLibrary[parseInt(retrieveBookToToggle)].read) == "No"){
                toggleBook.read = "Yes";
                myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
            }
            displayBooksOnPage();
        }
        //Loop over the object keys and values and display to each card
        for(let key in myLibraries){
            const para = document.createElement("p");
            para.textContent = (`${key}: ${myLibraries[key]}`);
            card.appendChild(para);
        }
        index++;
    })
  }

  //Start event listener/ add input to array for new entry form
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", intakeFormData);

  //Tranform form data to variables for intake
  function intakeFormData(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    //Break out if form is incomplete or not valid
    if((title == "") || (author == "") || (pages == "") || (read == "")){
        return;
    }

    //Call function to input the book data to array
    addBookToLibrary(title,author,pages,read);

    //Reset the form after successful submission
    document.getElementById("add-book").reset();
  }

  //Start event listener for clear form button
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", clearForm);
   
  function clearForm(){
    document.getElementById("add-book").reset();
  }
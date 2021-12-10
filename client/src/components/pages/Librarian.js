import React, { useContext, useEffect } from "react";
import axios from 'axios';
import ViewSDKClient from './ViewSDKClient';
import "./test.css";

const CARD_PADDING = 0

const state = {
  container: null,
  card: null,
  numberOfItems: null,
  librarian: [],
}

var randomID = Math.floor(Math.random() * 899999 + 100000)

const initState = () => {
  state.container = document.getElementsByClassName('container')[0]
  state.card = document.querySelector('.card1') + document.querySelector('.card2') 
}

const updateContainerWidth = () => {  
  const cardAllWidth = state.card.offsetWidth + CARD_PADDING
  const numberOfItems = Math.floor(window.innerWidth / cardAllWidth)
  if (state.numberOfItems !== numberOfItems) {
    state.numberOfItems = numberOfItems
    const containerWidth = state.numberOfItems * cardAllWidth
    state.container.setAttribute("style", `width: ${containerWidth}px`)
  }
}

window.onload = () => {
  initState()
}

window.onresize = () => {
  updateContainerWidth()
}

function borrowNewItem(libraryID, catalogID) {
  var borrowDate = new Date;
  var borrowDate = borrowDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})

  var returnDate = new Date(Date.now() + 12096e5);
  var returnDate = returnDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})

  const test = {catalogID: catalogID, libraryID: libraryID, borrowDate: borrowDate, returnDate: returnDate, checkedOut: 1}
  const config = {
    headers: {
      "Content-Type": "application/json",
    },

  };

  axios.post("/api/loanrecord", test, config)

  var div = document.createElement('div');
  div.innerHTML = "Item successfully borrowed."
  var a = document.createElement('a');
  let view = document.createElement("button");
  view.innerHTML = "View";
  a.appendChild(view);
  a.href = "/viewer/" + catalogID;

  div.appendChild(a);

  var date = document.createElement('p');
  date.innerHTML = "Your loan ends on " + returnDate + " PST"
  
  div.appendChild(date);

  var borrow = catalogID.toString();
  document.getElementById(borrow).innerHTML = '';
  document.getElementById(borrow).appendChild(div);
  
  window.location.reload();


}

function returnNewItem(libraryID, catalogID) {;
  console.log("library:" + libraryID)
  console.log(catalogID)
  axios.get('/api/loanrecord/return', {
    params: {
      catalogID: catalogID,
      libraryID: libraryID
    }
  })
    console.log("hsg")
    var viewReturn = catalogID.toString();

    var borrow = document.createElement('button');
    borrow.innerHTML = 'Borrow';
    borrow.onclick = function(){
      borrowNewItem(libraryID, catalogID)
    };
    
    document.getElementById(viewReturn).innerHTML = '';
    document.getElementById(viewReturn).appendChild(borrow);

    window.location.reload();


}

window.onresize = () => {
  console.log('resize');
}

class Librarian extends React.Component {

  state = {
    title: '',
    body: '',
    posts: [],
    loans: [],
    user: [],
    librarian: [],
    hi: 0
  };

  componentDidMount = () => {

    this.getBlogPost();

    axios.get('/api/librarianauth')
    .then((response) => {
      const data = response.data;
      this.setState({ librarian: data });
      console.log('User has been received!!');
      console.log(data.librarianID);
    })
    .catch(() => {
    });

  };

  getBlogPost = () => {
    axios.get('/api/contacts')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving items!!!');
      });
  }
  displayBlogPost = (posts) => {
    if(posts!=null){
      return posts.map((post, index) => (
          <>
          <div key={index + '2'} id = {post.catalogID} class = "tableDiv">
            <div class = "subTableDiv">
          <p>Catalog ID: {post.catalogID} Title: {post.Title} </p>
          </div> {this.deleteButton(post.catalogID)}
          </div>
          </>
        ));
  }
  };

  deleteButton = (catalogID) => {
    return(
      <div class = "delete" id = "delete">
      <button id = "deleteButton" onClick={() => {this.deleteItem(catalogID)}}> Delete </button>
      </div>
    )
  }

  deleteItem = (catalogID) => {
    console.log(catalogID);
    axios.get('/api/contacts/delete', {
      params: {
        catalogID: catalogID,
      }
    })
    window.location.reload();
  }

  submit = (librarian) => {

    var today = new Date;
    var today = today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    var itemArr = Object.values(librarian);

    console.log(itemArr[2]);
    console.log(document.getElementById("date_published").valueAsDate)
    console.log(document.getElementById("title"))

    const date_published = document.getElementById("date_published").valueAsDate
    console.log(typeof date)

    const catalogID = randomID;
    const added_by_librarianID = itemArr[2];
    const Title = document.getElementById("title").value;
    const item_description = document.getElementById("description").value;
    const itemURL = document.getElementById("itemURL").value;
    const imageURL = document.getElementById("imageURL").value;

    const test = {catalogID: catalogID, added_by_librarianID: added_by_librarianID, Title: Title, date_published: date_published, item_description: item_description, itemURL: itemURL, imageURL: imageURL, date_item_added: today}
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post("/api/contacts", test, config)
    window.location.reload();
  }


  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <div class = "welcome">
        <h2>Welcome to the Librarian Page!</h2>
        </div>
        <div>
        <h3>Edit Catalog: </h3>
        <div class = "editCatalog">
          {this.displayBlogPost(this.state.posts)}
          </div>
        </div>
        <div>
        <div className="form-container1">
          <h3>Add Items: </h3>
            <label htmlFor="libraryID">Catalog ID </label> <p></p>
            <input type="number" id = "catalogID" value = {randomID} readonly /> <p></p>
            <label htmlFor="name"> Title </label> <p></p>
            <input type="text" id = "title" name="title"/>
            <label htmlFor="name"> Date Published (YYYY-MM-DD) </label> <p></p>
            <input type="date" id = "date_published" name="date_published"/>
            <label htmlFor="name"> Description </label> <p></p>
            <input type="text" id = "description" name="description"/>
            <label htmlFor="name"> Item URL </label> <p></p>
            <input type="text" id = "itemURL" name="Item URL"/>
            <label htmlFor="name"> Image URL </label> <p></p>
            <input type="text" id = "imageURL" name="imageURL"/>
        <button onClick={() => {this.submit(this.state.librarian)}}> Submit </button>
        </div>
        </div>
      </div>
    );
  }
}


export default Librarian;
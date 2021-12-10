import React, { useContext, useEffect } from "react";
import axios from 'axios';
import ViewSDKClient from './ViewSDKClient';
import "./test.css";

const CARD_PADDING = 0

const state = {
  container: null,
  card: null,
  numberOfItems: null,
}

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

class test extends React.Component {

  state = {
    title: '',
    body: '',
    posts: [],
    loans: [],
    user: [],
    hi: 0
  };

  componentDidMount = () => {

    this.getBlogPost();

    axios.get('/api/auth')
    .then((response) => {
      const data = response.data;
      this.setState({ user: data });
      console.log('User has been received!!');
      console.log(data.libraryID);
        axios.get('/api/loanrecord', {
          params: {
            libraryID: data.libraryID
          }
        })
        .then((response) => {
          const data = response.data;
          console.log(data)
          this.setState({ loans: data });
          console.log('Loans have been received!!');
        })
        .catch(() => {
        });

    })
    .catch(() => {
    });
  };

  authenticateUserLoans = () => {
  }


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
  
  borrowItem = (user, catalogID) => {

    var borrowDate = new Date;
    var borrowDate = borrowDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
  
    var returnDate = new Date(Date.now() + 12096e5);
    var returnDate = returnDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})

    var itemArr = Object.values(user);
    console.log(itemArr);
    const test = {catalogID: catalogID, libraryID: itemArr[2], borrowDate: borrowDate, returnDate: returnDate, checkedOut: 1}
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post("/api/loanrecord", test, config)

    let div = document.createElement("div");
    div.innerHTML = "Item successfully borrowed. <br>"
    var a = document.createElement('a');
    let view = document.createElement("button");
    view.innerHTML = "View";
    a.appendChild(view);
    a.href = "/viewer/" + catalogID;
  
    div.appendChild(a);
    let returnButton = document.createElement("button");
    returnButton.innerHTML = "Return";
    returnButton.id = "returnbutton";

    div.appendChild(returnButton);

    var date = document.createElement('p');
    date.innerHTML = "Your loan ends on " + returnDate + " PST"
    
    div.appendChild(date);

  
    var borrow = catalogID.toString();
    document.getElementById(borrow).innerHTML = '';
    document.getElementById(borrow).appendChild(div);
    document.getElementById("returnbutton").addEventListener('click', function(){
      returnNewItem(itemArr[2], catalogID)
  });
  }


  returnItem = (user, catalogID) => {
    var itemArr = Object.values(user);
    axios.get('/api/loanrecord/return', {
      params: {
        catalogID: catalogID,
        libraryID: itemArr[2]
      }
    })
      console.log("hsg")
      var viewReturn = catalogID.toString();

      var borrow = document.createElement('button');
      borrow.innerHTML = 'Borrow';
      borrow.onclick = function(){
        borrowNewItem(itemArr[2], catalogID)
      };
      
      document.getElementById(viewReturn).innerHTML = '';
      document.getElementById(viewReturn).appendChild(borrow);

      window.location.reload();

  }

  catalogButtons = (loans, id, user) => {
    var borrow = id.toString();
    var viewReturn = id.toString();

    var userArr = Object.values(user);

    if(userArr.length>0){
      if(loans!=null){
        var itemArr = Object.values(loans);
        console.log(itemArr);
        for(var i = 0; i < itemArr.length; i++){
          if(itemArr[i].catalogID == id && itemArr[i].checkedOut == 1){
          var returnDate = itemArr[i].returnDate;
          var returnDate = new Date(returnDate);
          console.log(typeof returnDate)
          returnDate = returnDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
          return(
            <div id = {viewReturn}>
            <a href = {"/viewer/" + id}>
            <button id = "viewButton">View</button>
            </a>
            <button onClick={() => {this.returnItem(this.state.user, id)}}> Return</button>
            <p> Your loan ends on {returnDate} PST</p> 
            </div>
          )
          }
        }
    }
    return(
      <div id = {borrow}>
      <button id = "borrowButton" onClick={() => {this.borrowItem(this.state.user, id)}}> Borrow </button>
      </div>
    )
    }
    else{
      return(
        <div> Log In to Borrow and View items </div>
      )
    }
  }

  displayBlogPost = (posts) => {
    if(posts!=null){
      return posts.map((post, index) => (
          <>
          <div key={index} class = "card2">
              <div class = "imagediv">
              <img class = "itemImage" src = {post.imageURL}></img>
              </div>
          </div>
          <div key={index} class = "card1">
          <h3>{post.Title}</h3>
            <p>{post.author}</p>
            <div class = "item_description">
            <p>{post.item_description}</p>
            </div>
            {this.catalogButtons(this.state.loans, post.catalogID, this.state.user)}
          </div>
          </>
        ));
  }
  };


  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <div class = "welcome">
        <h2>Welcome to the Library Catalog!</h2>
        </div>
        <section class="container">
          {this.displayBlogPost(this.state.posts)}
      </section>

      </div>
    );
  }
}


export default test;
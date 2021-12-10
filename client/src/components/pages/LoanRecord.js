import React, { useContext, useEffect } from "react";
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ViewSDKClient from './ViewSDKClient';
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

var id = window.location.href;
id = id.substring(id.lastIndexOf("/")+1)

class Viewer extends React.Component {


  state = {
    title: '',
    body: '',
    posts: [],
    comments: [],
    user: [],
    users: [],
    movies: [],
    books: []
  };

  componentDidMount = () => {
    axios.get('/api/comments/viewer')
    .then((response) => {
      const data = response.data;
      this.setState({ comments: data });
      console.log('Comments have been received!!');
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });

    axios.get('/api/auth')
    .then((response) => {
      const data = response.data;
      this.setState({ user: data });
      console.log('User has been received!!');
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });

    axios.get('/api/contacts/viewer', {
      params: {
        id: id
      }
    })
    .then((response) => {
      const data = response.data;
      this.setState({ posts: data });
      console.log('Item has been received!!');
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });

    axios.get('/api/getusers')
    .then((response) => {
      const data = response.data;
      this.setState({ users: data });
      console.log('Users have been received!!');
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });

    axios.get('/api/movies/viewer', {
      params: {
        id: id
      }
    })
    .then((response) => {
      const data = response.data;
      this.setState({ movies: data });
      console.log('Users have been received!!');
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });

    axios.get('/api/books/viewer', {
      params: {
        id: id
      }
    })
    .then((response) => {
      const data = response.data;
      this.setState({ books: data });
      console.log('Users have been received!!');
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });

  };

  getViewer = (movies, posts, books) => {
    const itemArr = Object.values(posts);
    const bookArr = Object.values(books);
    if(movies.length != 0)
      return(
        <video src = {itemArr[0].itemURL} controls width="250">
      </video>
      )
    else if(books.length!=0 && itemArr.length!=0){
        if(bookArr[0].type == 'audiobook'){
          return(<AudioPlayer
            src={process.env.PUBLIC_URL + itemArr[0].itemURL} 
            onPlay={e => console.log("onPlay")}
            // other props here
          />)
        }
        else if (bookArr[0].type == 'ebook'){
          console.log(itemArr[0].itemURL)
          const viewSDKClient = new ViewSDKClient();
          var bookURL = process.env.PUBLIC_URL + itemArr[0].itemURL
          viewSDKClient.ready().then(() => {
            viewSDKClient.previewFile(
              "ebook",
              {
                defaultViewMode: "FIT_WIDTH",
                showAnnotationTools: false,
                showLeftHandPanel: false,
                showPageControls: false,
                showDownloadPDF: false,
                showPrintPDF: false,
              }, bookURL
            );
          });
        }
        return(
          <div class = "ebook" id = "ebook"></div>
        )
    }
  }

  getUserName = (users, id) => {
    var itemArr = Object.values(users);
    console.log(id);
    for(var i = 0; i < itemArr.length; i++){
      if(itemArr[i].libraryID == id){
        console.log(itemArr[i].user_name)
        return itemArr[i].user_name;
      }
    }
  }

  getDate = (date) => {
    console.log(date);
    var date1 =new Date(date);
    return date1.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
  }

  getComments = (comments) => {
    var itemArr = Object.values(comments);

    if(itemArr.length!=0){
      console.log(itemArr[0].libraryID);
      itemArr = itemArr.filter(item => item.catalogID == id)
      console.log(itemArr[0]);
      return itemArr.slice(0).reverse().map((comment, index) => (
        <div key={index} id = "userComment" class = "userComment">
          <p>{comment.user_comment}</p>
          <p>posted by {this.getUserName(this.state.users, itemArr[itemArr.length-index-1].libraryID)}</p>
          <p>{this.getDate(comment.date_posted)}</p>

        </div>
      ));
    }
  }

  postComment = (user) => {
    var today = new Date;
    var today = today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    var itemArr = Object.values(user);
    console.log(itemArr);
    const test = {user_comment: document.getElementById('comment').value, catalogID: id, libraryID: itemArr[2], date_posted: today}

    document.getElementById("comments").innerHTML = "<div id = 'userComment' class = 'userComment'>   <p>  " + document.getElementById('comment').value + "</p> <p> posted by: " + itemArr[1] + "</p> <p> " + today + "</p> </div> " +  document.getElementById("comments").innerHTML

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post("/api/comments", test, config)
  }

  render() {
    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <div id = "catalogID"> </div>
      {this.getViewer(this.state.movies, this.state.posts, this.state.books)}
      <input type="text" id="comment"></input>
      <button onClick={() => {this.postComment(this.state.user)}}>Add Comment</button>
      <div id = "comments">
      {this.getComments(this.state.comments)}
      </div>
      </div>
    );
  }
}


export default Viewer;

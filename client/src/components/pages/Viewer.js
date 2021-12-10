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
    loanAuthenticated: 0,
    posts: [],
    loans: [],
    comments: [],
    ratings: [],
    user: [],
    users: [],
    movies: [],
    books: [],
    magazines: [],
    journals: [],
    newRating: 0,
  };

  componentDidMount = () => {
    axios.get('/api/comments/viewer', {
          params: {
            id: id
          }
        })
        .then((response) => {
          const data = response.data;
          this.setState({ comments: data });
          console.log('Comments have been received!!');
        })
        .catch(() => {
          alert('Error retrieving data!!!');
        });
      
    axios.get('/api/rating/viewer', {
          params: {
            id: id
          }
        })
        .then((response) => {
          const data = response.data;
          this.setState({ ratings: data });
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
      this.getLoans(this.state.user)
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });

  };

  getLoans= (user) => {
    var itemArr = Object.values(user);
    axios.get('/api/loanrecord/viewer', {
      params: {
        catalogID: id,
        libraryID: itemArr[2]
      }
    })
    .then((response) => {
      const data = response.data;
      this.setState({ loans: data });
      console.log('Loans have been received!!');
      this.authenticateLoan(this.state.loans);
        axios.get('/api/contacts/viewer', {
          params: {
            id: id
          }
        })
        .then((response) => {
          const data = response.data;
          this.setState({ posts: data });
          console.log('Items have been received!!');
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

      axios.get('/api/journals/viewer', {
        params: {
          id: id
        }
      })
      .then((response) => {
        const data = response.data;
        this.setState({ journals: data });
        console.log('Journals have been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });

      axios.get('/api/magazines/viewer', {
        params: {
          id: id
        }
      })
      .then((response) => {
        const data = response.data;
        this.setState({ magazines: data });
        console.log('Magazines have been received!!');
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


    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });
  }

  authenticateLoan = (loans) => {
    var itemArr = Object.values(loans);
    console.log(itemArr);
    for(var i = 0; i < itemArr.length; i++){
      if(itemArr[i].checkedOut == 1){
      this.setState({ loanAuthenticated: 1 });
      }
    }
  }

  getViewer = (movies, posts, books, magazines, journals, loanAuthenticated) => {
    if(loanAuthenticated == 1){
      const itemArr = Object.values(posts);
      const bookArr = Object.values(books);
      console.log(bookArr);

      if((magazines.length !=0 || journals.length!=0) && itemArr[0].itemURL != null){
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
        return(
          <div class = "ebook" id = "ebook"></div>
        )
      }

      if(movies.length != 0 && itemArr[0].itemURL != null)
        return(
          <div className = "viewerVideo">
          <video src = {itemArr[0].itemURL} controls width="500">
        </video>
          </div>
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
    else{
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

  getRating = (libraryID, ratings) => {
    var itemArr = Object.values(ratings);
    console.log(libraryID);
    for(var i = 0; i < itemArr.length; i++){
      if(itemArr[i].libraryID == libraryID){
        return itemArr[i].user_rating;
      }
    }
  }  


  getDate = (date) => {
    console.log(date);
    var date1 =new Date(date);
    return date1.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
  }

  getComments = (comments, ratings, loanAuthenticated) => {
    console.log(loanAuthenticated);
    console.log(comments);
    var itemArr = Object.values(comments);
    if(loanAuthenticated == 1){
    if(itemArr.length!=0){
      itemArr = itemArr.filter(item => item.catalogID == id)
      console.log(itemArr[0]);

      return itemArr.slice(0).reverse().map((comment, index) => (
        <div key={index} id = "userComment" class = "userComment">
          <p>{comment.user_comment}</p>
          <p>Rating: {this.getRating(comment.libraryID, this.state.ratings)}</p>
          <p>posted by {this.getUserName(this.state.users, itemArr[itemArr.length-index-1].libraryID)}</p>
          <p>{this.getDate(comment.date_posted)}</p>

        </div>
      ));
    }
    }
  }

  postCommentSetup = (loanAuthenticated) => {
    console.log(loanAuthenticated);
    if(loanAuthenticated == 1){
      return(  
      <div>
      <input class = "inputComment" type="text" id="comment"></input>
      <button class = "addComment" onClick={() => {this.postComment(this.state.user, this.state.newRating)}}>Add Comment</button>
      </div>
      )
    }
  }

  ratingSetup = (loanAuthenticated) => {
    if(loanAuthenticated == 1){
      return(
        <div>          
        <div class = "your-rating">Your rating</div>
        <div class="star-rating">
        <input type="radio" id="5-stars" name="rating" value="5"  onClick={() => {this.postRating(this.state.user, 5)}}/>
        <label for="5-stars" class="star">&#9733;</label>
        <input type="radio" id="4-stars" name="rating" value="4" onClick={() => {this.postRating(this.state.user, 4)}}/>
        <label for="4-stars" class="star">&#9733;</label>
        <input type="radio" id="3-stars" name="rating" value="3" onClick={() => {this.postRating(this.state.user, 3)}}/>
        <label for="3-stars" class="star">&#9733;</label>
        <input type="radio" id="2-stars" name="rating" value="2" onClick={() => {this.postRating(this.state.user, 2)}}/>
        <label for="2-stars" class="star">&#9733;</label>
        <input type="radio" id="1-star" name="rating" value="1" onClick={() => {this.postRating(this.state.user, 1)}}/>
        <label for="1-star" class="star">&#9733;</label>
      </div>
      </div>
      )
    }
  }

  setupRatingClick = () => {
  }


  postComment = (user, newRating) => {
    var today = new Date;
    var today = today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    var itemArr = Object.values(user);
    console.log(itemArr);
    
    var rating = 0;
    if(newRating != 0)
      rating = newRating;
    else
      rating = this.getRating(itemArr[2], this.state.ratings)

    document.getElementById("comments").innerHTML = "<div id = 'userComment' class = 'userComment'>   <p>  " + document.getElementById('comment').value + "</p> <p> Rating: " + rating + "</p> <p> posted by: " + itemArr[1] + "</p> <p> " + today + "</p> </div> " +  document.getElementById("comments").innerHTML

    const test = {user_comment: document.getElementById('comment').value, catalogID: id, libraryID: itemArr[2], date_posted: today}
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post("/api/comments", test, config)
  }

  postRating = (user, rating) => {
    this.setState({ newRating: rating })
    var today = new Date;
    var today = today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    var itemArr = Object.values(user);
    console.log(itemArr);

    const test = {user_rating: rating, catalogID: id, libraryID: itemArr[2], date_posted: today}
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post("/api/rating", test, config)

  }

  getInfo = (movies, posts, books, magazines, journals, loanAuthenticated) => {
    if(loanAuthenticated == 1){

      const itemArr = Object.values(posts);
      const bookArr = Object.values(books);
      console.log(bookArr);

      if((magazines.length !=0) && itemArr[0].itemURL != null){
        const magArr = Object.values(magazines);
        return(<div><h1>{itemArr[0].Title}, Volume {magArr[0].volume} Issue {magArr[0].issue}</h1></div>)
    }
    else if((journals.length !=0) && itemArr[0].itemURL != null){
      const journArr = Object.values(journals);
      return(<div><h1>{itemArr[0].Title}, Volume {journArr[0].volume} Issue {journArr[0].issue}, published by {journArr[0].published_by}</h1></div>)
  }
    else if((books.length !=0) && itemArr[0].itemURL != null){
      const bookArr = Object.values(books);
      return(<div><h1>{itemArr[0].Title} by {bookArr[0].author}</h1></div>)
  }
  else if((movies.length !=0) && itemArr[0].itemURL != null){
    const movieArr = Object.values(movies);
    return(<div><h1>{itemArr[0].Title}, Directed by {movieArr[0].director} </h1></div>)
}
    }
  }


  render() {
    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
      <div id = "titleInfo">{this.getInfo(this.state.movies, this.state.posts, this.state.books,  this.state.magazines,  this.state.journals, this.state.loanAuthenticated)}</div>
      {this.getViewer(this.state.movies, this.state.posts, this.state.books,  this.state.magazines,  this.state.journals, this.state.loanAuthenticated)}
      {this.postCommentSetup(this.state.loanAuthenticated)}
      {this.ratingSetup(this.state.loanAuthenticated)}
      <div id = "comments">
      {this.getComments(this.state.comments, this.state.ratings, this.state.loanAuthenticated)}
      </div>
      </div>
    );
  }
}


export default Viewer;

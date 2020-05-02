import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition';
import SignIn from './components/SignIn.jsx';
import Register from './components/Register';




const particleOptions=  {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 1000
      }
      
    }
    
  }
} 

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: "signin",
  isSignedIn: false,

  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }

}
class App extends Component {
  constructor(props){
    super(props);
    this.state= initialState;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

 loadUser = (data) =>{
   this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined 
   }})
  }

  calculateFaceLocation = (data) => {
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById("inputimage");
     const width = Number(image.width);
     const height = Number(image.height);
     return{
       leftCol: clarifaiFace.left_col * width,
       topRow: clarifaiFace.top_row * height,
       rightCol: width - (clarifaiFace.right_col * width),
       bottomRow: height - (clarifaiFace.bottom_row * height)

     }

  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }


  onInputChange(e){
    this.setState({input: e.target.value})
  }

  onSubmit(){
    this.setState({imageURL: this.state.input}) 
    fetch("https://morning-tor-32517.herokuapp.com/imageurl", {
          "method": "post",
          "headers": {"Content-type": "application/json"},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
    
      .then(response => {
      if(response){
        fetch("https://morning-tor-32517.herokuapp.com/image", {
          "method": "put",
          "headers": {"Content-type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })    
  
  }

  onRouteChange = (route) => {
    if(route === "signout"){
      this.setState(initialState)
    } else if(route === "home"){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render(){
   const {isSignedIn, imageURL, route, box} = this.state;

    return (
      <div className="App">
         <Particles className="particles"
         params={particleOptions} 
         />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
  
        { route === "home" 
        ? <div>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          />
          <FaceRecognition box={box} imageURL={imageURL}/>
          </div>
          : (route === "signin" 
          ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
          }
      </div>
    );

  }
  
}

export default App;

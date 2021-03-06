import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import styled from 'styled-components'
import {editCityInDatabase, getOneCityRoute} from '../../actions/thunk.cities.js'
import Navbar from '../navbar/Navbar'

class EditCityForm extends Component {

  componentWillMount() {
    this
      .props
      .getOneCityRoute(this.props.match.params.cityId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cityBeingEdited: {
        id: this.props.match.params.cityId,
        name: nextProps.cityBeingEdited.name,
        location: nextProps.cityBeingEdited.location,
        img_url: nextProps.cityBeingEdited.img_url
      }
    })
  }

  state = {
    cityBeingEdited: {
      id: "",
      name: "",
      location: "",
      img_url: ""
    }
  }

  handleChange = (event) => {
    const updatedCity = {
      ...this.state.cityBeingEdited
    }

    const inputField = event.target.name
    const inputValue = event.target.value
    updatedCity[inputField] = inputValue
    this.setState({cityBeingEdited: updatedCity})
  }

  handleEditCity = () => {
    this
      .props
      .editCityInDatabase(this.state.cityBeingEdited)
      .then(() => {
        (this.props.push(`/cities`))
      })
  }

  render() {
    return (
      <Container>
        <div>
          <Navbar/>
        </div>
        <div>
          Name:</div>
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.cityBeingEdited.name}/>
        <br/>
        <div>
          Location:</div>
        <input
          type="text"
          name="location"
          onChange={this.handleChange}
          value={this.state.cityBeingEdited.location}/>
        <br/>
        <div>
          Image_url:</div>
        <input
          type="text"
          name="img_url"
          onChange={this.handleChange}
          value={this.state.cityBeingEdited.img_url}/>
        <br/>
        <button onClick={this.handleEditCity}>
          Edit
        </button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {cityBeingEdited: state.cities[0]}
}

export default connect(mapStateToProps, {getOneCityRoute, editCityInDatabase, push})(EditCityForm)

// /////////////////////////////////////////////////////////////////////////////
// / / STYLED-COMPONENTS
// /////////////////////////////////////////////////////////////////////////////
// / /

const Container = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color:black;
    width: 100%;
    position: absolute; 
   
    background-image:linear-gradient(white,transparent,transparent,transparent,transparent),url(https://pbs.twimg.com/media/BzrxuvVIgAAj7YE.jpg:large);
    top: 0;
    left: 0;
    background-size: cover;
    background-repeat:no-repeat;
    font-family: 'Montserrat', sans-serif;
    /* background-color: #212121; */
    input{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 2px 0px rgba(0,0,0,0.25);
      border:1px solid black;
      background:none;
      border-radius:3px;
      width: 35vh;
      height: 5vh;
      margin: 3px;
      padding-left: 5px;
      background:rgba(255,255,255,0.65);
    }
    button{
      border:1px solid black;
      background:none;
      width: 125px;
      height: 45px;
      padding:7.5px;
      font-size: 15px;
      text-align: center;
      margin:5px;
      font-family: 'Montserrat', sans-serif;
      background:rgba(255,255,255,0.45);
      border-radius: 5px;
      cursor: pointer;
      &:hover{
        color: white;
      background:rgba(0,0,0,0.15);
      }};
`
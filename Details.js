import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from './style.js';



 export default class Details extends Component {
   state={
     info:{
    name:"loading !!",
    temp:"loading",
   icon:"loading",
    precip:"loading",
    wind:"loading",
  }
   }
   getWeather(){
     Mycity = "london"
     fetch(`http://api.weatherstack.com/current?access_key=cc53e0c4774be5adec55d4ae846eba93&query=${Mycity}
     `)
      .then(res=>res.json())
      .then(data=>{
        this.setState({
          info:{
          temp:data.current.temperature,
          icon:data.current.weather_icons,
          precip:data.current.precip,
          wind:data.current.wind_speed
          }
        }) 
      })
    }

   componentDidMount()
     {
     this.getWeather()
     
   }

  render(){
      console.warn(this.props.navigation.getParam('result'))
    return(
      <View style ={styles.container}> 
 

       <Image style={{width:50,height:50}}
       source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}}/>
       <Text>Temp:  {this.state.info.temp}</Text>
       <Text>Precipitaion:  {this.state.info.precip}</Text>
       <Text>WindSpeed:  {this.state.info.wind}</Text>
       <TouchableOpacity 
         style = {styles.submitButton} 
         onPress={()=>this.getWeather()}>
           <Text style = {styles.submitButtonText}> CapitalWeather </Text>
         </TouchableOpacity>

      </View>
    )
  }
   
 }

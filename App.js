import React from 'react';
import { Text,TextInput ,View , TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import axios from 'axios';
import Details from './Details.js'
import styles from './style.js'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      data:[],
      text:'',
    }
  }
 
      apihandler = async () => {
        
        try {
          const response = await axios.get(
            `https://restcountries.eu/rest/v2/name/${this.state.text}?fullText=true`,
          );
         
          console.warn(response.data)
          let result=response.data,
          return {
            result:response.data,
          }
        } catch (error) {
          // handle error
          alert(error.message);
        }
      };

      
  getInfo(text){
   
    this.setState({text})

    
  }
  render(){
  return (
    <View style={styles.container}> 
      {
        this.state.data.map((item)=>
        <Text>Name: {item.name} {"\n"}Population: {item.population} {"\n"}Capital: {item.capital} {"\n"}Latlng: {item.latlng}</Text>
        )

      }

      <TextInput 
       underlineColorAndroid = "transparent"
       placeholder = "Enter Country"
       placeholderTextColor = "grey"
      style={styles.input}
      onChangeText={text => this.getInfo(text)}
      ></TextInput>
            <TouchableOpacity
               style = {styles.submitButton} 
               onPress = {()=>{this.props.navigation.navigate("WeatherDetails",this.apihandler())}}>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
            </View>
            
  );
}
}

const appNavigator=createStackNavigator({
  Home:{
    screen:App,
  },
  WeatherDetails:{
    screen:Details
  }
})

export default createAppContainer(appNavigator);



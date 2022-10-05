import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons,Entypo } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

function Home() {
    return (
        <View>
        <Text>KSFJEROIHG</Text>
      </View>
    );
}

function Booking() {
    return (
        <View style={styles.container }>
        <Text style={styles.text_header}>Welcome!</Text>
        
    </View>
    );
}

function About() {
    return (
        <View style={styles.container }>
        <Text style={styles.text_header}>Welcome!</Text>
        
    </View>
    );
}

  function Profile() {
    return (
    
        <View style={styles.container }>
        <Text style={styles.text_header}>Welcome!</Text>
        
    </View>
    );
  }


const HomeScreen = ({route}) => {
    return (
        <Tab.Navigator
        initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                } /* ,
                
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          }
          <Ionicons name="md-infinite-sharp" size={24} color="black" />;

          if (route.name === "Booking") {
            iconName = focused
              ? "notifications-sharp"
              : "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          if (route.name === "About") {
            return (
              <Image
                style={{
                  height: deviceWidth * 0.14,
                  width: deviceWidth * 0.15,
                  borderRadius: 20,
                  marginBottom: 15,
                }}
              //  source={require("./Image/icon1.png")}
              />
            );
          }
          if (route.name === "Profile") {
            iconName = focused
              ? "notifications-sharp"
              : "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!<Ionicons name="camera-outline" size={24} color="black" />

          return <Ionicons name={iconName} size={31} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
                 */
          }} 
        >
            
            <Tab.Screen name="Home" component={Home} options={{

                tabBarIcon : ({focused}) => (
                    <View style={{alignItems:'center' , justifyContent: 'center', top:10}}>
                        <Ionicons 
                            name="home" 
                            size={20} 
                            color={focused ? '#009387' : '#05375a'}
                            style={{
                                width: 25,
                                height: 25,
                                
                            }}
                        />
                        <Text style={{color: focused ? '#009387' : '#000' , fontSize: 12}}>Home</Text>
                    </View>
                )

                }}/>
            <Tab.Screen name="Booking" component={Booking} options={{

                tabBarIcon : ({focused}) => (
                    <View style={{alignItems:'center' , justifyContent: 'center', top:10}}>
                        <Ionicons 
                            name="calendar" 
                            size={20} 
                            color={focused ? '#009387' : '#05375a'}
                            style={{
                                width: 25,
                                height: 25,
                
            }}
        />
        <Text style={{color: focused ? '#009387' : '#000' , fontSize: 12}}>Reservation</Text>
    </View>
)

}} />
            <Tab.Screen name="About" component={About} options={{

                tabBarIcon : ({focused}) => (
                    <View style={{alignItems:'center' , justifyContent: 'center', top:10}}>
                        <Ionicons 
                            name="home" 
                            size={20} 
                            color={focused ? '#009387' : '#05375a'}
                            style={{
                                width: 25,
                                height: 25,
                                
            }}
        />
        <Text style={{color: focused ? '#009387' : '#000' , fontSize: 12}}>Home</Text>
    </View>
)

}}/>
            <Tab.Screen name="Profile" component={Profile} options={{

                tabBarIcon : ({focused}) => (
                    <View style={{alignItems:'center' , justifyContent: 'center', top:10}}>
                        <Ionicons 
                            name="person" 
                            size={20} 
                            color={focused ? '#009387' : '#05375a'}
                            style={{
                                width: 25,
                                height: 25,
                                
            }}
        />
        <Text style={{color: focused ? '#009387' : '#000' , fontSize: 12}}>Profile</Text>
    </View>
)

}} />

      </Tab.Navigator>
      );

}

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
    
  });
  
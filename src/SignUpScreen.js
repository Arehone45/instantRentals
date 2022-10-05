import { View, Text, StyleSheet , TouchableOpacity , Dimensions, Platform , TextInput , ScrollView, KeyboardAvoidingView} from 'react-native'
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';

const SignUpScreen = ({navigation}) => {
const [userName , setUserName] = useState("");
const [phoneNo , setPhoneNo] = useState("");
const [userEmail , setUserEmail] = useState("");
const [userPass , setUserPass] = useState("");
const [confirmP , setConfirmP] = useState("");


const [data, setData] = React.useState({
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
});

const handlePasswordChange = (val) => {
    setData({
        ...data,
        password: val
    });
};

const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    })
}

const [pressed, setPressed] = useState(false)

const handleSubmission = () => {
    if (userName === "") {
        alert("Please enter your surname and full names before proceeding");
      } else if (phoneNo === "" || phoneNo.length != 10) {
        alert("Invalid Phone Number");
      } else if (userEmail === "") {
        alert("You must enter a valid Email Address ");
      } else if (userPass === "" || userPass.length < 7) {
        alert("Please create a password of at least 7 characters");
      } else if (confirmP === "" ) {
        alert("Confirm password");
      } else if (userPass != confirmP) {
        alert("Passwords do not match");
      } else {
        signUpUser();
        
      }
}

const signUpUser = () => {
   
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail.trim(), userPass.trim())
      .then(() => {
        const userId = firebase.auth().currentUser.uid;
        const timeStamp = Date.now();
        firebase
          .database()
          .ref(`Users/${userId}/PersonalData`)
          .update({
            userEmail,
            userName,
            phoneNo,
            userPass,
            dateJoined: timeStamp,
            lastSeen: timeStamp,
            userId,
            
          })
          .then(() => {
            navigation.navigate("Home");
        });
      })
      .catch((error) => {
        alert(error);
        
      });
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={[styles.text_header , {marginTop:20}]}>Register Now!</Text>
        </View>
       
        <View style={{flex: pressed ?17 : 3}}
            >
                 
            <KeyboardAvoidingView>
            <ScrollView
                keyboardShouldPersistTaps='handled'
            >

                <View style={styles.footer}>
                    
                    <Text style={[styles.text_footer , {marginTop:15}]}>Name</Text>
                    <View style={styles.action}>
                    <Ionicons 
                        name="person" 
                        size={20} 
                        color="#05375a" 
                    />
                        <TextInput
                            placeholder="Your Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(userName) => {setUserName(userName)}}
                        />
                        
                    </View>
                    <Text style={[styles.text_footer , {marginTop:20}]}>Phone Number</Text>
                    <View style={styles.action}>
                        <FontAwesome 
                            name="phone" 
                            size={20} 
                            color="#05375a" 
                        />
                        <TextInput
                            placeholder="Phone Number"
                            style={styles.textInput}
                            autoCapitalize="none"
                            keyboardType='numeric'
                            onChangeText={(phoneNo) => {setPhoneNo(phoneNo)}}

                        />
                        
                    </View>
                    <Text style={[styles.text_footer , {marginTop:20}]}>Email</Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons 
                            name="email" 
                            size={20} 
                            color="#05375a" 
                        />
                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onFocus={() => {setPressed(true)}}
                            onBlur={() => {setPressed(false)}}
                            onChangeText={(userEmail) => {setUserEmail(userEmail)}}


                        />
                        
                    </View>
                    <Text style={[styles.text_footer, {marginTop:20}]}>Password</Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons 
                            name="lock" 
                            size={20} 
                            color="#05375a" 
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={( userPass) => {
                                setUserPass(userPass)}}
                            onFocus={() => {setPressed(true)}}
                            onBlur={() => {setPressed(false)}}
                        />
                        <TouchableOpacity
                        onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color='grey'
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color='grey'
                                size={20}
                            />
                            }
                        </TouchableOpacity>       
                    </View>

                    <Text style={[styles.text_footer, {marginTop:20}]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons 
                            name="lock" 
                            size={20} 
                            color="#05375a" 
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(confirmP) => {
                                setConfirmP(confirmP)}}
                            onFocus={() => {setPressed(true)}}
                            onBlur={() => {setPressed(false)}}

                        />
                        <TouchableOpacity
                        onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color='grey'
                                size={20}
                            
                            />
                            :
                            <Feather
                                name="eye"
                                color='grey'
                                size={20}
                            
                            />
                            }
                        </TouchableOpacity>       
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleSubmission}
                        style={styles.signIn}
                        >
                        <Text style={[styles.textSign, 
                        {
                            color: '#fff'
                        }]}>Sign Up</Text>
                        </TouchableOpacity>      

                            
                    </View>

                    <View style={styles.button2}>
                        <Text>Already a user?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}
                        style={styles.signIn}
                        >
                        <Text style={[styles.textSign, 
                        {
                            color: '#009387',
                        }]}>Sign In</Text>
                        </TouchableOpacity>      

                            
                    </View>
                    
                
           
           <Text></Text>
           <Text></Text>   
                </View>
           
                </ScrollView>
            </KeyboardAvoidingView>
            
        </View>
       
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
       flex: 0.4,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: Platform.OS === 'ios' ? 5 : 7,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,   
        backgroundColor: "#009387",
        padding: 10,
        margin: 10,
        borderRadius: 30,
    },
    button2: {
        alignItems: 'center',
        marginTop: 0,  
        marginBottom: 40, 
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
        borderRadius: 30,
        flexDirection: 'row'
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
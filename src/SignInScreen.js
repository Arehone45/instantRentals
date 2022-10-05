import { View, Text, StyleSheet , TouchableOpacity , Dimensions, Platform , TextInput} from 'react-native'
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'firebase';


const SignInScreen = ({navigation}) => {

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

const [existEmail, setExistEmail] = useState('')
const [existPassword, setExistPassword] = useState('')

const handleSubmition = () => {
    if (existEmail.length == 0 || existPassword.length == 0) {
      alert("invalid email or password ");
      setLoading(false);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(existEmail, existPassword)
        .then(() => {
          let userId = firebase.auth().currentUser.uid;
          firebase.database().ref(`Users/${userId}/PersonalData`).update({
            lastSeen: Date.now(),
          });
          
              //taking a snapshot from the firebase
          firebase
            .database()
            .ref(`Users/${userId}/PersonalData`)
            .update({lastSeen: Date.now(),})
            navigation.navigate("Home");
        
        })
        .catch((error) => {
          alert(error);

        });
       
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <View style={styles.footer}>
            
            <Text style={styles.text_footer}>Email</Text>
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
                    onChangeText={(existEmail)=>{setExistEmail(existEmail)}}
                />
                
            </View>
            <Text style={[styles.text_footer, {marginTop:35}]}>Password</Text>
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
                    onChangeText={(existPassword)=>{setExistPassword(existPassword)}}
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
                <TouchableOpacity onPress={handleSubmition}
                style={styles.signIn}
                >
                <Text style={[styles.textSign, 
                {
                    color: '#fff'
                }]}>Sign In</Text>
                </TouchableOpacity>      

                    
            </View>

            <View style={styles.button2}>
                <Text>Not a user?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}
                style={styles.signIn}
                >
                <Text style={[styles.textSign, 
                {
                    color: '#009387',
                }]}>Sign Up</Text>
                </TouchableOpacity>      
                    
            </View>
            
            
        </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
        marginTop: -5,   
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
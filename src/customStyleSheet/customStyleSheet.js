import {StyleSheet} from 'react-native';


// resources: https://blog.logrocket.com/complex-gradients-react-native-linear-gradient/
//            https://www.figma.com/file/jw26dB840GZ7bE1DjoTwsm/Untitled?type=design&node-id=75-2&t=IQ0fedIqspDyoNx8-0





const styles = StyleSheet.create({

    container: {
      flex: 1,
      padding: 0,
      // backgroundColor: '#B455FF',

    },


    root: {
      alignItems: 'center',
      padding: 15,
      marginTop: 30,
      justifyContent: 'center',
    },

    root2: {
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
     
    },

    logo: {
      marginTop: 20,
      fontSize: 55,
      width: 200,
      height: 180,
      fontStyle: 'italic',
      fontWeight: 900,   
      alignItems: 'center',
      flexDirection: 'column',
      lineHeight: 55, 
      textAlign: 'center',
      letterSpacing: 0,
      color: 'white',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginTop: 20,
      color: 'white',
      width: 200,
      height: 100,
      fontWeight: 900,   
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      letterSpacing: 0,
    },
    title2: {
      fontSize: 30,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginTop: 20,
      color: 'white',
      width: 200,
      height: 100,
      fontWeight: 900,   
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      letterSpacing: 0,
    },
    homePageTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      color: 'white',
      padding: 15,
      flexDirection: 'column',
      textAlign: 'left',
      letterSpacing: 0,
    },
    subtitle: {
      fontSize: 25,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginTop: 5,
      marginBottom: 20,
      color: 'white',
      padding: 15,
      flexDirection: 'column',
      textAlign: 'left',
      letterSpacing: 0,
    },
    text: {
      color: 'white',
      marginVertical: 10,
      fontSize: 15,
      fontWeight: 12,
      fontWeight: 'bold',
      width: '75%',
      textAlign: 'center',
    },
    textLeft: {
      color: 'white',
      marginVertical: 5,
      fontSize: 15,
      fontWeight: 12,
      fontWeight: 'bold',
      width: '100%',
      textAlign: 'left',
    },
    largerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      textAlign: 'center',
      width: '80%',
    },
   
    largerTextLeft: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'left',
      width: '90%',
    },
    largerTextLeft2: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
      marginLeft: 10,
      textAlign: 'left',
      width: '80%',
    },
    
 
    card: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      
    },
    divider: {
      backgroundColor: 'white',
      height: 1,
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 10,
      width: '85%',
    },

    picker: {
      
      justifyContent: 'center',
      textAlign: 'center',
      alignContent: 'center',
      
    },

    blurContainer: {
      fontSize: 20,
      flex: 1,
      padding: 5,
      width: '75%',
      marginVertical: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
      justifyContent: 'center',

     
     },
     blurContainer2: {
      fontSize: 20,
      flex: 1,
      width: '90%',
      padding: 5,
      marginVertical: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
      justifyContent: 'center',

     },
     blurContainer3: {
      fontSize: 20,
      flex: 1,
      alignItems: 'center',
      marginVertical: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
      justifyContent: 'center',
      width: '75%',
    
   
     },
     blurContainer4: {
      fontSize: 20,
      flex: 1,
      marginBottom: 100,
      alignItems: 'center',
      backgroundColor: 'transparent',
      textAlign: 'center',
      justifyContent: 'center',
      width: '90%',
 
     },

     blurView: {
      height: 40,
      borderRadius: 20,
      overflow: "hidden", 
     },

     blurView2: { 
      borderRadius: 20,
      alignItems: "center",
      justifyContent: 'center',
      width: '100%',
      padding: 15,
      marginTop: 10,
      marginBottom: 60,
      overflow: "hidden", 
     
     },
     blurView3: {
      flex: 1,
      borderRadius: 20,
      alignItems: "center",
      marginTop: 10,
      justifyContent: 'center',
      overflow: "hidden", 
      width: '100%',
     
     },
     blurView4: {
      flex: 1,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: 'center',
      width: '100%',

      padding: 20,
      marginTop: 5,
      overflow: "hidden",
     
     },
     
  });

  export default styles;
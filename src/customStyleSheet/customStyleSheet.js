import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// resources: https://blog.logrocket.com/complex-gradients-react-native-linear-gradient/
//            https://www.figma.com/file/jw26dB840GZ7bE1DjoTwsm/Untitled?type=design&node-id=75-2&t=IQ0fedIqspDyoNx8-0

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B455FF',

    },
    root: {
      alignItems: 'center',
      padding: 15,
      marginTop: 30,
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
      marginBottom: 10,
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
    text: {
      color: 'white',
      marginVertical: 10,
      fontSize: 15,
      fontWeight: 'bold',
      padding: 15,
      textAlign: 'center',
    },
  });

  export default styles;
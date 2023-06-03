import { StyleSheet, Text, View } from "react-native";
import styles from '../../customStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
 
  return (
    <LinearGradient style={styles.container}
    colors={[
      '#E4B9FF',
      '#DA9EFF',
      '#C86DFF',
      '#B455FF',
      '#A055FF',
      '#9655FF',
      '#7755FF',
      '#7755FF',
      '#6355FF',
    ]}
    start={{x: 0, y: 0}}
    end={{x: .85, y: .75}}
    locations={[.03, .09, .25, .38, .49, .59, .7, .8, .95]}
  >
    <View style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.logo}>Busy Body</Text>
        <Text style={styles.homePageTitle}>
        Workouts customized to meet your fitness goals</Text>

      </View>
    </View>
    </LinearGradient>
  );
}




export default Home;


import { StyleSheet, Text, View } from "react-native";
import styles from '../../customStyleSheet';

const Home = () => {
 
  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.logo}>Busy Body</Text>
        <Text style={styles.homePageTitle}>
        Workouts customized to meet your fitness goals</Text>

      </View>
    </View>
  );
}




export default Home;


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


//import for survey
import Survey from '../../screens/survey';

//imports for workotus
import ViewWorkouts from '../../screens/viewWorkouts';
import EditWorkouts from '../../screens/editWorkouts';
import ExerciseDetails from '../../screens/exerciseDetails';

// imports for tab
import Home from '../../screens/home';
import Workouts from '../../screens/workouts';
import Stats from '../../screens/stats';
import Profile from '../../screens/profile';

// imports for stack
import Login from '../../screens/login';
import SignUp from '../../screens/signUp';
import ConfirmEmail from '../../screens/confirmEmail';
import ForgotPassword from '../../screens/forgotPassword';
import ResetPassword from '../../screens/resetPassword';
 
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function WorkoutNavigation () {

  const route = useRoute();
  const {userID, bodyType, experienceLevel} = route.params;

  return(
      <Stack.Navigator>
      
          <Stack.Screen 
              name="Workouts"
              component={Workouts}
              initialParams = {{userID, bodyType, experienceLevel}}
          />
          <Stack.Screen 
              name="EditWorkouts"
              component={EditWorkouts}
              initialParams = {{userID, bodyType, experienceLevel}}
          />
          <Stack.Screen 
              name="ViewWorkouts"
              component={ViewWorkouts}
              initialParams = {{userID, bodyType, experienceLevel}} 
          /> 
          <Stack.Screen 
              name="ExerciseDetails"
              component={ExerciseDetails}
              initialParams = {{userID}} 
          />   
      </Stack.Navigator>
  )
}

function TabNavigation () {

  const route = useRoute();
  const {userID, bodyType, experienceLevel} = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'blue',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WorkoutNavigation"
        component={WorkoutNavigation}
        initialParams={{userID, bodyType, experienceLevel}}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="fitness-center"
              size={24}
              color={color}
            />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="fitness" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{userID}}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function StackNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Survey" component={Survey} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;




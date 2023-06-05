import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import {StyleSheet} from 'react-native';


//imports for workouts
import ExerciseDetails from '../screens/exerciseDetails';
import ExerciseInstructions from '../screens/exerciseInstructions'

// imports for tab
import Home from '../screens/home';
import Workouts from '../screens/workouts';
import Profile from '../screens/profile';
import Stats from '../screens/stats';

// imports for stack
import Login from '../screens/login';
import SignUp from '../screens/signUp';
 
// Resources: https://github.com/react-navigation/react-navigation/issues/1340
//          https://reactnavigation.org/docs/stack-navigator/


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function WorkoutNavigation () {

  const route = useRoute();
  const {exercise, exercise_list, users, user, userID} = route.params;

  return(
      <Stack.Navigator>
      
          <Stack.Screen  
              name="Workouts"
              component={Workouts}
              options={{
                headerTintColor: 'transparent',
                headerTransparent: true,
            
              }}
              initialParams = {{users, user, userID}}
    
          /> 
          <Stack.Screen 
              options= {{
              headerTintColor: 'black'
              }}
              name="ExerciseDetails"
              component={ExerciseDetails}
            
              initialParams = {{exercise_list, user}} 
           
          />   
         <Stack.Screen 
              options= {{
              headerTintColor: 'black'
              }}
              name="ExerciseInstructions"
              component={ExerciseInstructions}
              initialParams = {{exercise}} 
          />   
  
      </Stack.Navigator>
  )
}

function TabNavigation () {

  const route = useRoute();
  const {exercise_list, users, user, userID} = route.params;

  return (
    <Tab.Navigator

      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#7755FF',
        tabBarInactiveTintColor: '#7755FF',
        tabBarStyle: { position: 'absolute' },

        tabBarBackground: () => (
          <BlurView tint="light" intensity={70}
          style={StyleSheet.absoluteFill}   />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: 'transparent',
          headerTransparent: true,
          headerBlurEffect: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WorkoutNavigation"
        component={WorkoutNavigation}
        initialParams={{exercise_list, users, user, userID}}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="fitness-center"
              size={30}
              color={color}
            />
          ),
          headerShown: false
        }}
      />
  
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{users, user, userID}}
        options={{
          headerTintColor: 'transparent',
          headerTransparent: 'true',
          headerBlurEffect: 'true',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        initialParams={{ users, user, userID }}
        options={{
          headerTintColor: 'transparent',
          headerTransparent: 'true',
          headerBlurEffect: 'true',
          tabBarIcon: ({ color }) => (
          <Ionicons name="stats-chart" size={30} color={color} />
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
      <Stack.Screen
          name="TabNavigation"
          component={TabNavigation} />
  
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;




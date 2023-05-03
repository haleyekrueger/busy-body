// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';


// import Login from '../../screens/login';
// import SignUp from '../../screens/signUp';
// import ConfirmEmail from '../../screens/confirmEmail';
// import ForgotPassword from '../../screens/forgotPassword';
// import ResetPassword from '../../screens/resetPassword';


// import Home from '../../screens/home';
// import Workouts from '../../screens/workouts';
// import Stats from '../../screens/stats';
// import Profile from '../../screens/profile';


// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// export const TabNavigation = () => {
//     return(  

//        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: "blue"}}>
//           <Tab.Screen 
//             name='Home' 
//             component={Home}
//             options={{
//                  tabBarIcon: ({color}) => (<FontAwesome name="home" size={24} color={color} />), 
//                  }}
//             />
//             <Tab.Screen 
//             name='Workouts' 
//             component={Workouts}
//             options={{
//                  tabBarIcon: ({color}) => <MaterialIcons name="fitness-center" size={24} color={color} />}}/>
//             <Tab.Screen 
//             name='Stats' 
//             component={Stats}
//             options={{
//                  tabBarIcon: ({color}) => (
//                     <Ionicons name="fitness" size={24} color={color} />),
//                 //  headerShown: true,
//                 }}
//                 />
//             <Tab.Screen 
//             name='Profile' 
//             component={Profile}
//             options={{
//                  tabBarIcon: ({color}) => (<Ionicons name="person" size={24} color={color} />),
//                 // headerShown: false,
//                 }
//                 }/>
//        </Tab.Navigator>
//     );
    
// };


// export const StackNavigation = () => {
//     return(
//     <Stack.Navigator screenOptions={{headerShown: false}}>      
//             <Stack.Screen name='Login' component={Login}></Stack.Screen>
//             <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
//             <Stack.Screen name='ConfirmEmail' component={ConfirmEmail}></Stack.Screen>
//             <Stack.Screen name='ForgotPassword' component={ForgotPassword}></Stack.Screen>
//             <Stack.Screen name='ResetPassword' component={ResetPassword}></Stack.Screen> 
//     </Stack.Navigator>  
//     );
// };

// export default StackNavigation;

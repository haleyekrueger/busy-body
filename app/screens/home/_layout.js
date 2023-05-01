// Creates bottom nav bar with icons and routing

import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default () => {
    return (
        < Tabs screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: "blue"}}>
            <Tabs.Screen 
            name='dashboard' 
            options={{
                 tabBarIcon: ({color}) => (<FontAwesome name="home" size={24} color={color} />), 
                 }}/>
            <Tabs.Screen 
            name='workouts' 
            options={{
                 tabBarIcon: ({color}) => <MaterialIcons name="fitness-center" size={24} color="black" />}}/>
            <Tabs.Screen 
            name='stats' 
            options={{
                 tabBarIcon: ({color}) => (
                    <Ionicons name="fitness" size={24} color="black" />),
                //  headerShown: true,
                }}
                />
               <Tabs.Screen 
            name='profile' 
            options={{
                 tabBarIcon: ({color}) => (<Ionicons name="person" size={24} color="black" />),
                // headerShown: false,
                }
                }/>
            </Tabs>
    )
    };
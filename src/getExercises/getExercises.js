import axios from 'axios';


// Connecting to rapid api exercises by api ninjas. Exporting the information
// to use in the workouts screen


const GetExercises = async (muscle) => {
  const options = {
    method: 'GET',
    url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
    params: {muscle},
    headers: {
      'X-RapidAPI-Key': '96ae2f4ad8mshd5578d05a86a6a2p163cd4jsn55d55b0c1348',
      'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
  };

try {
	const response = await axios.request(options);

	return(response.data);
} catch (error) {
	console.error(error);
}

}

export default GetExercises;
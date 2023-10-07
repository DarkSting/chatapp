import axios from 'axios';


const chaturl = axios.create({
    baseURL:'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json', // Set the request content type to JSON
      },

})


export default chaturl;
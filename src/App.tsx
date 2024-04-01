
import axios from 'axios'

import { FC,useEffect, useState } from 'react'
import { AppProps, Users} from './App.types';
import User from './components/User'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



// 1st way 
/*export interface AppProps {
  title: string;
}

export interface Name {
  first : string;
  last : string;
}
export interface Login {
  uuid: string;
}

export interface Users {
  name: Name;
  login: Login;
  email: string;
} */

// OR 
/*
type Name = {
  first: string;
  last: string;
};

type Login = {
  uuid: string;
};

type Users = {
  name: Name;
  login: Login;
  email: string;
}; */


// 2nd way
// instead of the interface declaration, we used the type declaration. 
//Now the code will work without any TypeScript error.

// type AppProps = {
//   title: string;
// };

// 3rd way 
// const App = ({title}: {title: string}) => {
//   return <div>App</div>
// }

const App: FC<AppProps> = ({title}) => {

  const [ users , setUsers] = useState<Users[]>([]);
  
  // for displaying the loading indicator 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username , setUsername] = useState('');


    const handleClick = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          'https://randomuser.me/api/?results=10'
        );
        console.log(data);
        setUsers(data.results);
      } catch (error){
        console.log(error); 
      } finally {
        setIsLoading(false);
      }
    };

    const handleChange = ( event : React.ChangeEvent<HTMLInputElement> ) => {
       setUsername(event.target.value);
    };
   

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Show Users</button>
      <input type='text' onChange={handleChange} />
      <div>{username}</div>
      {isLoading && <p>Loading...</p>}
      <ul>
        {users.map(({ name, email}) => {
          return <User name = {name} email ={email} />;
        })}
      </ul>
    </div>
  
  );
};




export default App

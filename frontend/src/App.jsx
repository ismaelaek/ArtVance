import { useEffect, useState } from 'react'
import axios from  'axios'
import './App.css'


function App() {
  const [data, setData] = useState('');
  const [users, setUsers] = useState([]);
  const getData = async (endPoinet) => {
    try {
      const respo = await axios.get(`http://localhost:8000/api/${endPoinet}`);
      // console.log(respo.data)
      endPoinet === 'users' ? setUsers(respo.data) : setData(respo.data);
      
    } catch (error) {
        return error.message
    }
  }
  useEffect(() => {
    getData('users')
    getData('test')
  },[])

  return (
    <div className='container'>
      {/* you can style stuff using classNmae only */}
      <h1
        className=' text-4xl cursor- text-green-600 p-10 font-bold mb-5'
      >Hello ArtVance</h1>


      <h1 className=' text-3xl'>
        { data }
      </h1>
      <h1 className=' mt-3 text-2xl'>Users:</h1>
      <ul>
        {users.length !== 0 &&
          users.map((user, index) => {
            return <li className=' text-3xl underline text-red-800' key={index}> {user} </li>
          })
        }
      </ul>
    </div>
  )
}

export default App

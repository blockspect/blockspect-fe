import {useEffect,useState} from 'react'
import axios from 'axios'

const baseURL = "https://api.whale-alert.io/v1/transactions?api_key=g2Cmd8eUhAPVlQkBQmUdCrjtbDqCsKLu";

function WhaleWatch() {

    // const [transactionData,setTransactionData] = useState('')
    const [post, setPost] = useState(null);
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            console.log(response.data)
          setPost(response.data);
        });
      }, []);
    
      if (!post) return null;

  return (

    <div>
jdsbvjfbv
    </div>
  )
}

export default WhaleWatch
import React, {useEffect, useState} from 'react';
import Giphy from './components/Giphy';
import axios from "axios";

const App = () => {
  
  const [data, setData] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params:{
            api_key: "ltZmwuuZiiV2i2e5mfUfKDMyEcY89FWB"
          }
        });

        console.log(results);
        setData(results.data.data);
      }

      fetchData()
    }, []);

  return (
  <div>
    <Giphy />
    </div>
  );
};

export default App;

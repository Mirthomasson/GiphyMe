import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loader from './Loader';
import Paginate from './Paginate';

/* eslint-disable */
const Giphy = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    //page 1 item 1 - item 25
    //page 2 item 26 - item 50
    //page 3 item 51 - item 75

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              limit: 100
            }
          });

          console.log(results);
          setData(results.data.data);

            } catch (err) {
                setIsError(true);
                setTimeout(() => setIsError(false), 4000);
            }
      

          setIsLoading(false)
        };
  
        fetchData()
      }, []);
  
    const renderGifs = () => {
        if (isLoading) {
        return <Loader />;
        }
        return currentItems.map(el => {
            return (
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url} alt="Gif"/>
                </div>
            );
        });
    };

    const renderError = () => {
        if(isError) {
            return (
                <div className='alert alert-danger alert-dismissable fade show' role="alert">
                    Unable to get Gifs, please try again in a few minutes.
                    </div>
            );
        }
    };

    const handleSearchChange = event => {
        setSearch(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    q: search, 
                    limit: 1000
                }
            });
            setData(results.data.data);
          }  catch (err) {
            setIsError(true);
                setTimeout(() => setIsError(false), 4000);
          }

            setIsLoading(false);
        };

        const pageSelected = pageNumber => {
            setCurrentPage(pageNumber);
        };
    

    return (
        <><h1 className='title'>GiphyMe</h1>
        <div className='search-bar'>
            {renderError()}
            <form className='form'>
                <input
                    value={search}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder='search'
                    className='form-control' />
                <button
                    onClick={handleSubmit}
                    type='submit'
                    className='btn'>
                    GO
                </button>
            </form>
            <div className="container gifs">
                {renderGifs()}
            </div>
            <Paginate
                pageSelected={pageSelected}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={data.length} />
        </div>
        </>
    );
};



export default Giphy;
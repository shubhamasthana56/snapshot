import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])
  useEffect(()=> {
    //method key cat/mountain/ sort per_page:40 format xml/json
    const params = {
      method: "flickr.photos.search",
      api_key: "ce0dcd91841d5929b585b53d173b7952",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    //farm id secret server
    const parameters = new URLSearchParams(params);
    //?per_page=24&
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=> {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData)=> {
        return fetchFlickrImageUrl(imgData, 'q');
      });
      setImageData(arr);
    }).catch(()=> {

    }).finally(()=> {

    })

  }, [searchText])
  const fetchFlickrImageUrl = (photo, size)=> {
    //farm66.staticflickr.com/server/id_
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <>
    <input onChange={(e)=> {searchData.current = e.target.value} }/>
    <button onClick={()=> {setSearchText(searchData.current)}}>Search</button>
    <section>
      <button onClick={()=> {setSearchText("mountains")}}>Mountains</button>
      <button onClick={()=> {setSearchText("beaches")}}>Beaches</button>
      <button onClick={()=> {setSearchText("birds")}}>Birds</button>
      <button onClick={()=> {setSearchText("food")}}>Food</button>
    </section>
    <section className='image-container'>
      
        {imageData.map((imageurl, key)=> {
          return (
            <article className='flickr-image'>
              <img src={imageurl} key={key}/>
            </article>
          )
          
        })}
      
    </section>
    </>
  );
}

export default App;

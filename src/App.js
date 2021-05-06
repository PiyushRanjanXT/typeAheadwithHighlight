
import { useState, useEffect } from 'react';
import jQuery from "jquery";
import _ from 'lodash';
import './App.css';
import SearchResult from './SearchResult';

function App() {

  const [inputText, setInputText] = useState('');
  const [list, setList] = useState([]);
  const [cacheData, setCacheData] = useState([])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

  }

  const filterData = (list,searchText) => {
    let dataArray = _.filter(list, function(data) { 
      return data.indexOf(searchText) > -1 ; 
    });

    return _.slice( dataArray, 0, 15);
  }

  const getData = (inputText) => {
    if (inputText.length < 3) {
      setList([]);
    } else {
      if(!cacheData.length){
        jQuery.ajax({
          url: 'https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words',
          dataType: 'text',
          cache: false,
          success: function (data) {
            let dataArray = data.split('\n');
            setCacheData(dataArray);
            setList(filterData(dataArray,inputText));
          },
          error: function (xhr, status, err) {
            console.error(status, err.toString());
          }
        });
      }else{
        setList(filterData(cacheData,inputText));
      }


    }

  }
  useEffect(() => {
    getData(inputText);
  },[inputText]);



  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, Piyush </h1>
        <input
          type="text"
          onChange={(e) => handleInputChange(e)}
          value={inputText}
        />
        <SearchResult
          list={list}
          searchText={inputText}
        />
      </header>
    </div>
  );
}

export default App;

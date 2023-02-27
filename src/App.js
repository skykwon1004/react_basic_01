import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';


// 1. api : db가 있음
// 2. db에서 data를 가져옴, useEffect 데이터 가져올 때 react
// 3. 가져 온 데이터를 react로 뿌려 줌 (react에서 쉬우니깐)


const UL = styled.ul`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 10px;
list-style: none;
margin: 0;
padding: 10px;
img{
  max-width: 100%;
}

@media (max-width: 768px) {
  grid-template-columns: repeat(1, 1fr);
}
`
const H1 = styled.h1`
text-align: center;
`
const Search = styled.div`
text-align: center;
padding: 20px;
`

function App() {
  const [pic, setPic] = useState([]);
  const [s, setS] = useState('sea');
  const getData = async () => {
    const data = await fetch(`https://pixabay.com/api/?key=21103852-9b5f4834542caaf4eef2c8533&q=${s}&image_type=photo`)
      .then(r => r.json());
    // console.log(data, data.hits, data.hits[0].id);
    setPic(data.hits);
    console.log(data.hits);
  }

  useEffect(() => {
    getData();
  }, [s]);

  return (
    <>
      <H1>pixabay</H1>
      <Search>search : <input onChange={(e) => setS(e.target.value)} value={s} /></Search>
      <UL>
        {
          pic.map(it => {
            return (
              <li key={it.id}>
                <img src={it.largeImageURL} />
                <div>{it.id}</div>
                <div>{it.tags}</div>
              </li>
            )
          }
          )
        }
      </UL>
    </>
  );
}

export default App;

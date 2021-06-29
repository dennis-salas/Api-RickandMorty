import React, { useState, useEffect } from 'react'

export const Characters = () => {

    const [ character, setCharacter ] = useState([]);

    const [ detail, setDetail ] = useState({});

    const [ input, setInput ] = useState("");

    useEffect(() => {
        getCharacters().then(results =>{setCharacter(results)})
        return () => {
            
        }
    }, [])

    

    const getCharacters = async () => {
        const url = 'https://rickandmortyapi.com/api/character/';
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        const results = data.results;
        // const {results} = data;

        
        return results
        
    }
    const handleClick = (element) => {
        setDetail(element);
        console.log(detail);
    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();

           const results = await getCharacters();
           setCharacter(results);

            console.log(input);
            const peoples = character;
            const data = peoples.filter((people) => people.name.toLowerCase().includes(input.toLowerCase()));
            setCharacter(data);
          
        
    }

    return (
        <div>
            <div>
                <h1>Personajes Rick and Morty</h1>
                <form
                    onSubmit={handleSubmit} 
                >
                    <input 
                        type="text"
                        placeholder="Buscar"
                        name="search"
                        value={input}
                        onChange={handleChange}
                    ></input>
                    <button
                        type="submit" 
                    >Buscar</button>
                </form>
            </div>
            
            {
                // Se realizo un condicional ternario 
                detail.name ? 
                <div className="card-detail">
                    <img src={detail.image} className="card-img-detail" alt={detail.name}></img>
                    <p className="card-text">Nombre: {detail.name}</p>
                    <p className="card-text">Estado: {detail.status}</p>
                    <p className="card-text">Origen: {detail.origin}</p>
                    <p className="card-text">Especie: {detail.specie}</p>
                </div>
                : null
            }
           
            {
                character.map(char => (
                    <div className="card" key={char.id}>
                        <img src={char.image} className="card-img-top" alt={char.name}></img>
                        <p className="card-text">{char.name}</p>
                        <p className="card-text">{char.status}</p>
                        <p className="card-text">{char.gender}</p>
                        <p className="card-text">{char.origin.name}</p>
                        <button onClick={()=>{handleClick(char)}}>Detalle</button>
                    </div>
                ))
            }
        </div>
    )
}

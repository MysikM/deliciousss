import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";

function Searched() {
    const params = useParams();
    const [searchedRecipes, setSearchedRecipes] = useState([]);

    const getSearched = async(name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=21&query=${name}`)
        const recipes = await data.json();
        setSearchedRecipes(recipes.recipes);
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search])

    return (
        <Grid>
            {searchedRecipes.map((item) => {
                return (
                    <Card key={item.id} >
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt={item.title} />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                );
            })}
        </Grid>
    );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 1.5rem;
`;

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    font-size: 0.7rem;
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
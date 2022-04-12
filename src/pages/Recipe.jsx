import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
    }

    useEffect(()=> {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <Box>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title} />
                <h3 dangerouslySetInnerHTML={{__html: details.summary}} />
            </Box>
            <Info>
                <Button
                    className={activeTab === 'instructions' && 'active'}
                    onClick={() => setActiveTab('instructions')}
                >
                    Instructions
                </Button>
                <Button
                    className={activeTab === 'ingredients' && 'active'}
                    onClick={() => setActiveTab('ingredients')}
                >
                    Ingredients
                </Button>
                <div>
                    {activeTab === 'instructions'  && <h3 dangerouslySetInnerHTML={{__html: details.instructions }} /> }
                    {activeTab === 'ingredients'
                    &&  <ul>
                            {details?.extendedIngredients?.map((ingredient) => {
                                return (
                                <li key={ingredient.id}>{ingredient.original}</li>
                                );
                            })}
                        </ul>}
                </div>
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  
  img {
    width: 25rem;
  }
  
  h3{
    font-size: 1rem;
    line-height: 1.5rem;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  ul {
    margin-top: 0.5rem;
    list-style-type: disc;
  }
`;

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  color: #313131;
  background: #fff;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
`;

const Box = styled.div`
  width: 50%;
`;

export default Recipe;
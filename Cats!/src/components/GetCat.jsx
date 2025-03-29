import React from "react";
import { useState } from "react";
import axios from "axios"


const GetCat = (props) => {
    const [catAttributes, setCatAttributes] = useState({breed: null, origin: null, life_span: null, img_url: null})
    const [banList, setBanList] = useState(new Set([]))

    const APIKEY = import.meta.env.VITE_API_KEY
    const url = "https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=" + APIKEY
    
    const getCat = async () => {
            let result = await axios.get(url)

            let breed = result.data[0].breeds[0].name
            let origin = result.data[0].breeds[0].origin
            let lifeSpan = result.data[0].breeds[0].life_span
            let imgUrl = result.data[0].url

            while (banList.has(origin) || banList.has(breed) || banList.has(lifeSpan)){
                result = await axios.get(url)
                breed = result.data[0].breeds[0].name
                origin = result.data[0].breeds[0].origin
                lifeSpan = result.data[0].breeds[0].life_span
                imgUrl = result.data[0].url
            }
            
        updateCatAttributes(breed, origin, lifeSpan, imgUrl)
    }

    const updateCatAttributes = (newBreed, newOrigin, newLifeSpan, newURL) => {
        setCatAttributes(prevCat => ({...prevCat, breed: newBreed, origin: newOrigin, life_span: newLifeSpan, img_url: newURL}))
    }

    function addBan(banToAdd) {
        setBanList(prevBans => new Set([...prevBans, banToAdd]))
    }    

    function removeBan(banToRemove){
        setBanList(prevBans => {
          prevBans.delete(banToRemove)
          return new Set(prevBans)
        })
    }

    return (
        <>
        <div className="cat-info-container">
            <div className="cat-attributes-container">
                {catAttributes.breed && <div className="box" onClick={() => addBan(catAttributes.breed)}>{catAttributes.breed}</div>}
                {catAttributes.life_span && <div className="box" onClick={() => addBan(catAttributes.life_span)}>{catAttributes.life_span} years</div>}
                {catAttributes.origin && <div className="box" onClick={() => addBan(catAttributes.origin)}>{catAttributes.origin}</div>}
            </div>
            {catAttributes.img_url && <img src={catAttributes.img_url} height="300"/>}
            <div className="cat-button-contaiiner">
                <button className="button-31" role="button" onClick={getCat}>Discover Cat</button>
            </div>
        </div>
        <div className="ban-list-container">
            {Array.from(banList).map((ban, index) => (
            <div key={index} className="banned" onClick={() => removeBan(ban)}>{ban}</div>
            ))}
        </div>
        </>
    )

    

}

export default GetCat
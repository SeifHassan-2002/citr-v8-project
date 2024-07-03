import { useState, useEffect } from "react";
import Pet from "./Pet.jsx";
import useBreedList from "./useBreedList.js";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  let [location, setLoctation] = useState("");
  let [animal, setAnimal] = useState("");
  let [breed, setBreed] = useState("");
  let [pets, setPets] = useState([]);
  let [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    let res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    let json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLoctation(e.target.value)}
            placeholder="Location"
            value={location}
            id="location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            value={animal}
            id="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            value={breed}
            id="breed"
            disabled={breeds.length === 0}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default SearchParams;

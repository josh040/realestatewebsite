import { Button, Flex, Heading, Textarea } from '@chakra-ui/react'
import { useContext} from "react";
import { HouseContext } from '../../context/HouseContext';
import { testFilterFunctionality } from './MainFilter'; // Import the function

import LocationFilter from "./LocationFilter";
import PriceFilter from "./PriceFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";

const Search = () => {

  const { searchHandler } = useContext(HouseContext);



    function generateSearchSummary() {
        const filterSummary = testFilterFunctionality();
        return `Search Results: ${filterSummary}`;
    }

    return (
    <Flex my='3' direction='column' borderRadius='md' bg='#fff' boxShadow='md' p='5'>

      <Heading py='2' size={{base: 'sm', md: 'md'}}>Search the price you are looking for</Heading>

      <Flex gap={{base: 3, md: 2}} direction={{base: 'column', md:'row'}} borderRadius='30'>
        <LocationFilter />
        <PropertyTypeFilter />
        <PriceFilter />
          <Textarea
              id="searchNotesTextarea"
              placeholder="Advanced Search Options..."
              style={{ width: '100%', minHeight: '100px', flexGrow: 1 }}
          />
          <Button
              onClick={() => {
                  const searchSummary = generateSearchSummary();
                  const textarea = document.getElementById('searchNotesTextarea');
                  if (textarea) {
                      textarea.value = searchSummary;
                  }
                  searchHandler();
              }}
              p={{base: 3, md: 2}} size="100%"
          >Search</Button>

      </Flex>
    </Flex>
  )
}

export default Search
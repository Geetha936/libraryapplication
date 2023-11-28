

import { Carousel } from "./components/carousel";
import { ExploreTopbooks } from "./components/exploreTopbooks";
import { Heros } from "./components/heros";
import { LibraryServices } from "./components/libraryservices";

export const Homepage = () =>{
    return(
        <>
   
      <ExploreTopbooks/>
      <Carousel/>
      <Heros/>
      <LibraryServices/>
      
 
      </>
    )

};
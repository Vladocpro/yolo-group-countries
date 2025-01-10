import React, {FC, useRef, useState} from "react";
import debounce from "lodash.debounce";
import IconSearch from "./icons/IconSearch.tsx";

interface Props {
   setSearch: (countryCode: string) => void
}

const CountriesFilterSearch: FC<Props> = ({setSearch}) => {


   const debouncedSearch = debounce((countryCode: string) => {
      setSearch(countryCode)
   }, 400);

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      debouncedSearch(e.target.value)
   }

   return (
       <div className="relative">
          <IconSearch/>
          <input type="text"  onChange={handleChange} id="search" maxLength="2"
                 className="bg-dark pl-9 pr-4 sm:pr-5 py-2 text-sm sm:text-base w-[150px] sm:w-[240px] placeholder-white hover:ring-1 hover:ring-main outline-none focus:outline-none focus:ring-1 focus:ring-main rounded-md"
                 placeholder="Search by code"/>
       </div>
   );
};

export default CountriesFilterSearch;

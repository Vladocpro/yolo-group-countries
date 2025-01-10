import {FC} from "react";
import {Country} from "../types/graphql";
import IconArrowLeft from "./icons/IconArrowLeft.tsx";
import IconArrowRight from "./icons/IconArrowRight.tsx";
import IconLoader from "./icons/IconLoader.tsx";

interface Props {
   countries: Country[]
   loading: boolean
   error: string | null
   goToPreviousPage: () => void
   goToNextPage: () => void
   currentPage: number
   totalPages: number
}

const CountriesTable: FC<Props> = ({countries, loading, error, goToPreviousPage, goToNextPage, totalPages, currentPage}) => {


   if(loading) {
      return (
          <div className="w-full flex items-center justify-center h-52">
             <IconLoader/>
          </div>
      )
   }

   if (error != null) {
      return (
          <div className="text-2xl text-center text-white bg-red-600 my-6 py-5 rounded-md">
             Error: {error || 'Sorry, something went wrong!'}
          </div>
      )
   }

   if (countries.length === 0 && !loading) {
      return (
          <div className="text-2xl text-center text-white bg-red-600 my-6 py-5 rounded-md">
             Sorry, we could not find any countries
          </div>
      )
   }

   return (
       <div>
          <div className="flex flex-col border-[1.5px] border-gray-600 mt-4 rounded-md overflow-hidden">
             <div className="flex justify-between px-2 py-4 bg-submain">
             <span className="text-lg sm:text-xl font-semibold">
                Name
             </span>
                <span className="text-lg sm:text-xl font-semibold">
                Code
             </span>
             </div>
             {countries?.map((country: Country) => (
                 <div key={country.code} className="grid grid-cols-[1fr,44px] group py-1.5 px-2 text-base sm:text-lg font-medium odd:bg-[#303030] hover:bg-main">
                 <span className="text-left">
                    {country.name}
                 </span>
                    <span className="text-main text-center group-hover:text-white rounded-lg">
                    {country.code}
                 </span>
                 </div>
             ))}
          </div>
          <div className="flex justify-between items-center mt-1 mx-0.5">
             <IconArrowLeft goToPreviousPage={goToPreviousPage}/>
             <span className="text-xl sm:text-2xl">
                {currentPage}/{totalPages}
             </span>
             <IconArrowRight goToNextPage={goToNextPage}/>
          </div>
       </div>
   )
}

export default CountriesTable;

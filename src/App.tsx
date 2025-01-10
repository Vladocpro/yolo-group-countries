import {useEffect, useState} from "react";
import {Country} from "./types/graphql";
import {useApolloClient} from "@apollo/client";
import {GET_ALL_COUNTRIES, GET_COUNTRY_BY_CODE} from "./graphql/queries/countries.ts";
import CountriesTable from "./components/CountriesTable.tsx";
import CountriesFilterSearch from "./components/CountriesFilterSearch.tsx";



function App() {
   const [search, setSearch] = useState<string>("");
   const [countries, setCountries] = useState<Country[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const [currentPage, setCurrentPage] = useState<number>(1);
   const countriesPerPage: number = 10;

   const client = useApolloClient();

   // Pagination logic
   const startIndex: number = (currentPage - 1) * countriesPerPage;
   const endIndex: number = startIndex + countriesPerPage;
   const totalPages: number = Math.ceil(countries.length / countriesPerPage);

   // Table navigation handlers
   const goToNextPage = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
   };

   const goToPreviousPage = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
   };

   const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
         if (search.trim() === '') {
            // Fetch all countries
            const {data } = await client.query({ query: GET_ALL_COUNTRIES });
            setCountries(data.countries.flat());
         } else {
            // Fetch countries by code
            const { data } = await client.query({
               query: GET_COUNTRY_BY_CODE,
               variables: { code: search.toUpperCase() },
            });
            setCountries(data?.countries);
         }
      } catch (err: Error) {
         setError(err.message);
      } finally {
         setCurrentPage(1)
         setLoading(false);
      }
   };



   useEffect(() => {
      fetchCountries(); // Fetch on search change or initial load
   }, [search]); // Dependency: search changes trigger fetch


  return (
    <div className="flex flex-col items-center">
       <div className="flex flex-col min-w-[320px] sm:w-[600px]">
          <p className="font-bold text-2xl sm:text-3xl text-main mt-8 text-center">Countries GraphQL Fetcher</p>
          <div className="flex w-full justify-between items-center mt-10 gap-4 sm:gap-10">
             <CountriesFilterSearch setSearch={setSearch}/>
             <span className="font-bold text-sm sm:text-lg">Countries Found: {countries?.length}</span>
          </div>
          <CountriesTable
              countries={countries?.slice(startIndex, endIndex)}
              error={error}
              loading={loading}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
              currentPage={currentPage}
              totalPages={totalPages}
          />
       </div>
    </div>
  )
}

export default App

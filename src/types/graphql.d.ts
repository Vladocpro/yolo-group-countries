import {ApolloError} from "@apollo/client";

export interface Country {
   name: string;
   code: string;
}

export interface GetAllCountriesResponse {
   data: {
      countries?: Country[] | null
   }
   loading: boolean
   error: ApolloError | undefined
}

export interface GetCountriesByCodeVariables {
   code: string;
}

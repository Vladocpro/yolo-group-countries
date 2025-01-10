import {gql} from "@apollo/client";

export const GET_ALL_COUNTRIES = gql`
    query GetAllCountries {
        countries {
            name
            code
        }
    }
`;

export const GET_COUNTRY_BY_CODE = gql`
    query GetCountryByCode($code: String!) {
        countries(filter: { code: { eq: $code } }) {
            code
            name
        }
    }
`;

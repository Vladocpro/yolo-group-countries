import {FC} from "react";

interface Props {
   goToNextPage: () => void;
}
const IconArrowRight: FC<Props> = ({goToNextPage}) => {
   return (
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
            className="w-10 sm:w-12 cursor-pointer select-none hover:stroke-main transition-all duration-300" onClick={goToNextPage}>
          <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18"></path>
          <path d="M16 12l-4 -4"></path>
          <path d="M16 12h-8"></path>
          <path d="M12 16l4 -4"></path>
       </svg>
   );
};

export default IconArrowRight;

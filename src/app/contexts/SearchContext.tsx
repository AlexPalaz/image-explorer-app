import { createContext, useContext, useReducer } from "react";
import { UnsplashPhoto } from "../types/Photos";

export enum EAction {
  NextPage = "NEXT_PAGE",
  PrevPage = "PREV_PAGE",
  UpdateTerm = "UPDATE_TERM",
  UpdateResults = "UPDATE_RESULTS",
}

export type Action =
  | { type: EAction.NextPage }
  | { type: EAction.PrevPage }
  | { type: EAction.UpdateTerm; payload: string }
  | { type: EAction.UpdateResults; payload: UnsplashPhoto[] };

export type SearchDispatchContextState = {
  goToNextPage: () => void;
  goToPrevPage: () => void;
  updateTerm: (term: string) => void;
  updateResults: (payload: UnsplashPhoto[]) => void;
};

export type SearchContextState = {
  term: string;
  page: number;
  results: UnsplashPhoto[];
};

const initialState: SearchContextState = {
  term: "",
  page: 1,
  results: [],
};

const reducer = (
  state: SearchContextState,
  action: Action
): SearchContextState => {
  switch (action.type) {
    case EAction.UpdateTerm:
      return { ...state, term: action.payload };
    case EAction.NextPage:
      return { ...state, page: state.page + 1 };
    case EAction.PrevPage:
      return { ...state, page: Math.max(state.page - 1, 1) };
    case EAction.UpdateResults:
      return { ...state, results: action.payload };
    default:
      return state;
  }
};

export const SearchContext = createContext<SearchContextState>(null!);

export const SearchDispatchContext = createContext<SearchDispatchContextState>(
  null!
);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export const useSearchDispatchContext = () => {
  const context = useContext(SearchDispatchContext);
  if (!context) {
    throw new Error(
      "useSearchDispatchContext must be used within a SearchProvider"
    );
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const goToNextPage = () => dispatch({ type: EAction.NextPage });
  const goToPrevPage = () => dispatch({ type: EAction.PrevPage });
  const updateTerm = (payload: string) =>
    dispatch({ type: EAction.UpdateTerm, payload });
  const updateResults = (payload: UnsplashPhoto[]) =>
    dispatch({ type: EAction.UpdateResults, payload });

  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider
        value={{ goToNextPage, goToPrevPage, updateTerm, updateResults }}
      >
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

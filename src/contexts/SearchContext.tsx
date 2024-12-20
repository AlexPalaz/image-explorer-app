import { createContext, useCallback, useContext, useReducer } from "react";
import { UnsplashPhoto } from "../types/Photos";
import { generate } from "random-words";

export enum EAction {
  UpdateTerm = "UPDATE_TERM",
  UpdatePage = "UPDATE_PAGE",
  UpdateResults = "UPDATE_RESULTS",
  UpdateTotalPages = "UPDATE_TOTAL_PAGES",
}

export type Action =
  | { type: EAction.UpdateTerm; payload: string }
  | { type: EAction.UpdatePage; payload: number }
  | { type: EAction.UpdateResults; payload: UnsplashPhoto[] }
  | { type: EAction.UpdateTotalPages; payload: number };

export type SearchDispatchContextState = {
  updateTerm: (payload: string) => void;
  updatePage: (payload: number) => void;
  updateTotalPages: (payload: number) => void;
  updateResults: (payload: UnsplashPhoto[]) => void;
};

export type SearchContextState = {
  term: string;
  pages: number;
  page: number;
  results: UnsplashPhoto[] | null;
};

const initialState: SearchContextState = {
  term: "",
  pages: 0,
  page: 0,
  results: null,
};

const reducer = (
  state: SearchContextState,
  action: Action
): SearchContextState => {
  switch (action.type) {
    case EAction.UpdateTerm:
      return { ...state, term: action.payload };
    case EAction.UpdatePage:
      return { ...state, page: action.payload };
    case EAction.UpdateTotalPages:
      return { ...state, pages: action.payload };
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

  const updateTerm = useCallback(
    (payload: string) =>
      dispatch({
        type: EAction.UpdateTerm,
        payload: payload || (generate() as string),
      }),
    [dispatch]
  );

  const updatePage = useCallback(
    (payload: number) =>
      dispatch({
        type: EAction.UpdatePage,
        payload,
      }),
    [dispatch]
  );

  const updateTotalPages = useCallback(
    (payload: number) =>
      dispatch({
        type: EAction.UpdateTotalPages,
        payload,
      }),
    [dispatch]
  );

  const updateResults = useCallback(
    (payload: UnsplashPhoto[]) =>
      dispatch({
        type: EAction.UpdateResults,
        payload,
      }),
    [dispatch]
  );

  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider
        value={{ updateTerm, updatePage, updateTotalPages, updateResults }}
      >
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

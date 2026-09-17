import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialJobs } from "../data";
import { loadState, reducer, STORAGE_KEY } from "../services/storage";

const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [initial] = useState(() => {
    try {
      return loadState(window.localStorage, initialJobs);
    } catch {
      return loadState(
        {
          getItem() {
            throw new Error();
          },
        },
        initialJobs,
      );
    }
  });
  const [state, dispatch] = useReducer(reducer, initial.data);
  const [warning, setWarning] = useState(initial.warning);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      setWarning(
        "O navegador bloqueou o armazenamento. As alterações funcionam nesta sessão, mas não serão mantidas ao recarregar.",
      );
    }
  }, [state]);
  return (
    <AppContext.Provider
      value={{ state, dispatch, warning, clearWarning: () => setWarning("") }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useApp = () => useContext(AppContext);

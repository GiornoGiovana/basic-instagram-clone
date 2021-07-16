import { createContext, useContext } from "react";

export const SuperHero = createContext(null);

export const useSuperHero = () => useContext(SuperHero);

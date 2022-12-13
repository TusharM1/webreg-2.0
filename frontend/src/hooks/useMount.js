import { useEffect } from "react";
//Allows the use of the mount from react
export const useMount = (effect) => useEffect(effect, []);
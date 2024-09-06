import React , { useState , useEffect , createContext } from 'react'

//creating context 
const ThemeContext = createContext()

 export const ThemeProvaider = ( { children } ) => {

    //managing state for controling themes
    const [ theme , setTheme ] = useState( localStorage.getItem('theme') || 'light' ) // if it is already selected one persisting the theme in the local storage 


    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
      }, [theme]);


      return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
      );

}

export default ThemeContext;
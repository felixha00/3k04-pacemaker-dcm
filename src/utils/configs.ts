import { theme } from "@chakra-ui/core";
import { extendTheme } from "@chakra-ui/core"
import "./styles.css"


export const customTheme = extendTheme({
    
    components: {
    },
    
    colors: {
      
  
      brand: {
        bg: '#232323',
        primary: '',
        secondary: '',
      }
      
    },
    fonts: {
      heading: 'Manrope',
      body: 'Inter'
    },
  })
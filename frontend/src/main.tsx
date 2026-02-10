import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({});

createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ChakraProvider>,
)

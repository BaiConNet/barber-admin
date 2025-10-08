import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { Toaster } from 'react-hot-toast'; // 1. Importe o Toaster aqui

export default function App() {
  return (
    <BrowserRouter>
      {/* 2. Adicione o componente Toaster aqui */}
      {/* Ele ficará "invisível", esperando para ser chamado de qualquer lugar do seu app */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#27272a', // Um cinza escuro para combinar com seu tema
            color: '#e2e8f0', // Um cinza claro para o texto
            border: '1px solid #3f3f46', // Borda sutil
          },
        }}
      />
      
      {/* Suas rotas continuam sendo renderizadas normalmente */}
      <AppRoutes />
    </BrowserRouter>
  );
}
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleLogin = () => {
  if (email && senha) {
    setLogado(true);
    setMensagem('Login simulado com sucesso!');
  } else {
    setMensagem('Preencha todos os campos.');
  }
};


  const handlePagamento = async (tipo) => {
    try {
      const res = await axios.post(`http://localhost:3001/pagamento/${tipo}`, { email });
      window.location.href = res.data.link;
    } catch (err) {
      setMensagem('Erro ao iniciar pagamento.');
    }
  };

  if (!logado) {
    return (
      <div className="p-10 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="border p-2 mb-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="border p-2 mb-2 w-full" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Entrar</button>
        <p className="mt-4 text-red-500">{mensagem}</p>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Bem-vindo, {email}</h2>
      <p className="mb-4">Escolha a forma de pagamento para assinatura mensal:</p>
      <button onClick={() => handlePagamento('pix')} className="bg-green-500 text-white px-4 py-2 rounded mr-4">Pagar com Pix</button>
      <button onClick={() => handlePagamento('cartao')} className="bg-purple-500 text-white px-4 py-2 rounded">Pagar com Cartão</button>
    </div>
  );
}

export default App;

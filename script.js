// script.js
function registerUser() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
  
    if (!name) {
      alert('Por favor, preencha o campo Nome.');
      return;
    }
    if (!email) {
      alert('Por favor, preencha o campo E-mail.');
      return;
    }
    if (!password) {
      alert('Por favor, preencha o campo Senha.');
      return;
    }
    if (!role) {
      alert('Por favor, selecione o Tipo de Usuário.');
      return;
    }
  
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  }
  
  function loginUser() {
    // Simula um usuário como mentorado para este exemplo
    const userRole = 'mentorado'; // Alterar para 'mentor' para testar a restrição
  
    if (userRole === 'mentorado') {
      // Redireciona para a página inicial do mentorado
      window.location.href = 'dashboard.html';
    } else {
      alert('Apenas mentorados podem acessar esta tela.');
    }
  }
  
  // Função para salvar o perfil do mentor
async function salvarPerfil() {
  const nome = document.getElementById('nome').value;
  const especialidade = document.getElementById('especialidade').value;
  const biografia = document.getElementById('biografia').value;
  const contato_email = document.getElementById('email').value;
  const contato_linkedin = document.getElementById('linkedin').value;

  // Validação básica
  if (!nome || !especialidade || !biografia || !contato_email) {
      alert('Todos os campos obrigatórios devem ser preenchidos.');
      return;
  }

  try {
      // Enviando dados para o backend
      const response = await fetch('http://localhost:3000/api/mentor/criar-perfil', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, especialidade, biografia, contato_email, contato_linkedin }),
      });

      const result = await response.json();
      alert(result.message); // Mostra mensagem do servidor

      if (response.ok) {
          // Após salvar, recarregue ou redirecione
          window.location.reload();
      }
  } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Ocorreu um erro ao salvar o perfil. Tente novamente mais tarde.');
  }
}

// Função para listar agendamentos do mentor
async function listarAgendamentos(idMentor) {
  try {
      const response = await fetch(`http://localhost:3000/api/agendamentos/${idMentor}`);
      const agendamentos = await response.json();

      // Atualizar o conteúdo da página
      const conteudo = document.getElementById('conteudo');
      conteudo.innerHTML = '<h2>Agendamentos</h2>';

      if (agendamentos.length === 0) {
          conteudo.innerHTML += '<p>Você não possui agendamentos no momento.</p>';
      } else {
          const lista = document.createElement('ul');
          agendamentos.forEach((agendamento) => {
              const item = document.createElement('li');
              item.textContent = `Mentorado ID: ${agendamento.id_mentorado}, Data: ${agendamento.data_horario}`;
              lista.appendChild(item);
          });
          conteudo.appendChild(lista);
      }
  } catch (error) {
      console.error('Erro ao listar agendamentos:', error);
      alert('Ocorreu um erro ao buscar os agendamentos.');
  }
}


// Simulando mensagens
let messages = [
  { sender: 'mentor', text: 'Olá! Como posso ajudar você hoje?' },
];

// Renderizar mensagens no chat
function renderChat() {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = '';
  messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', msg.sender);
      messageDiv.textContent = msg.text;
      chatBox.appendChild(messageDiv);
  });
  chatBox.scrollTop = chatBox.scrollHeight; // Rola para a última mensagem
}

// Enviar uma nova mensagem
function sendMessage() {
  const input = document.getElementById('chatMessage');
  const text = input.value.trim();
  if (text) {
      messages.push({ sender: 'mentorado', text });
      input.value = '';
      renderChat();
  }
}

// Inicializar o chat
document.addEventListener('DOMContentLoaded', renderChat);

function startVideoCall() {
  alert('Iniciando videochamada...');

  // Abrir um link para uma sala de videoconferência
  window.open('https://meet.jit.si/NomeDaSalaExemplo', '_blank');
}

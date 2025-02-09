var listaUsuario = [];
var count = 1;

function addUsuario(nome, email) {
  var novoUsuario = { 
    id: count++, 
    nome: nome, 
    email: email, 
    data: new Date().toLocaleDateString() 
  };
  listaUsuario.push(novoUsuario);
  localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario));
  renderUsuario();
}

function procurarUsuario(info) {
  var usuarios = listaUsuario.filter(function (usuario) {
    return usuario.nome.toLowerCase().includes(info.toLowerCase()) || 
           usuario.email.toLowerCase().includes(info.toLowerCase());
  });
  renderUsuario(usuarios);
}

function listaDeUsuario() {
  var listaStorage = JSON.parse(localStorage.getItem('listaUsuario'));
  listaUsuario = listaStorage || [];
}

function renderUsuario(usuario = listaUsuario) {
  var listaUsuarioElement = document.getElementById('listar-usuarios');
  listaUsuarioElement.innerHTML = '';

  usuario.forEach(function (usuario) {
    var listaItem = document.createElement('li');
    listaItem.innerHTML = `
      <span class="usuario-data">${usuario.data}</span> 
      <span class="usuario-nome">${usuario.nome}</span> 
      <span class="usuario-email">${usuario.email}</span> 
      <button class="usuario-deletar" title="Excluir" onclick="excluirUsuario(${usuario.id})"><i class="fas fa-times"></i></button>
    `;
    listaUsuarioElement.appendChild(listaItem);
  });
}

function excluirUsuario(usuarioId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      var listaUsuario2 = listaUsuario.filter(function (usuario) {
        return usuario.id !== usuarioId;
      });
  
      if (listaUsuario2.length < listaUsuario.length) {
        listaUsuario = listaUsuario2;
        localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario));
        renderUsuario();
      }
    }
}
  
function excluirTodos() {
    listaUsuario = [];
    localStorage.removeItem('listaUsuario');
    renderUsuario();
}

document.getElementById('cadusuario').addEventListener('submit', function (event) {
    event.preventDefault();
    var nomeInput = document.getElementById('nome');
    var emailInput = document.getElementById('email');
  
    if (nomeInput.value.trim() === '' || emailInput.value.trim() === '') {
      alert('Preencha todos os campos.');
      return;
    }
  
    addUsuario(nomeInput.value, emailInput.value);
    nomeInput.value = '';
    emailInput.value = '';
  });

document.getElementById('limpar').addEventListener('click', function () {
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
});

document.getElementById('limpar-todos').addEventListener('click', function () {
  excluirTodos();
});

document.getElementById('pesquisar').addEventListener('input', function (event) {
  procurarUsuario(event.target.value);
});

listaDeUsuario();

renderUsuario();
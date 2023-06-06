

const selectCidades = document.getElementById('cidades-select');

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios')
  .then(response => response.json())
  .then(data => {
    data.forEach(cidade => {
      const option = document.createElement('option');
      option.value = cidade.nome;
      option.textContent = cidade.nome;
      selectCidades.appendChild(option);
    });
  })
  .catch(error => {
    console.log('Ocorreu um erro ao obter as cidades:', error);
  });

  

  function trocarCor() {
    var body = document.getElementsByTagName("body")[0];
    var novaCor = gerarCorAleatoria();

    body.style.backgroundColor = novaCor;
  }

  function gerarCorAleatoria() {
    var letras = "0123456789ABCDEF";
    var cor = "#";

    for (var i = 0; i < 6; i++) {
      cor += letras[Math.floor(Math.random() * 5)];
    }

    return cor;
  };

  function limparInputs() {
    var inputs = document.getElementsByClassName("limpar");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }

  function carregarEstados() {
    var selectEstado = document.getElementById("estado");

    // Faz a requisição para a API que retorna os estados do Brasil
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        data.forEach(function(estado) {
          var optionEstado = document.createElement("option");
          optionEstado.value = estado.id;
          optionEstado.innerHTML = estado.nome;
          selectEstado.appendChild(optionEstado);
        });
      });
  }

  // Função para atualizar as cidades de acordo com o estado selecionado
  function atualizarCidades() {
    var selectEstado = document.getElementById("estado");
    var selectCidade = document.getElementById("cidade");
    var estadoSelecionado = selectEstado.value;

    // Limpa as opções de cidades
    selectCidade.innerHTML = "";

    // Selecione um estado primeiro
    if (estadoSelecionado === "") {
      var optionCidade = document.createElement("option");
      optionCidade.value = "";
      optionCidade.innerHTML = "Selecione um estado primeiro";
      selectCidade.appendChild(optionCidade);
      return;
    }

    // Faz a requisição para a API que retorna as cidades de um estado específico
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        data.forEach(function(cidade) {
          var optionCidade = document.createElement("option");
          optionCidade.value = cidade.id;
          optionCidade.innerHTML = cidade.nome;
          selectCidade.appendChild(optionCidade);
        });
      });
  }

  // Carrega os estados ao carregar a página
  carregarEstados();


  function typeWriter(text, i, speed, callback) {
    if (i < text.length) {
      document.getElementById("text").innerHTML += text.charAt(i);
      i++;
      setTimeout(function() {
        typeWriter(text, i, speed, callback);
      }, speed);
    } else {
      callback();
    }
  }
  
  
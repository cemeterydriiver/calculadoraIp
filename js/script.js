"use strict";

const $form = document.querySelector("form");

const $ip = document.getElementById("ip");
const $mascara = document.getElementById("mascara");
const $mascaraCIDR = document.getElementById("mascaraCIDR");

$form.addEventListener("submit", function(e) {
  e.preventDefault();

  limparCampos();

  try {
    if (!!$mascaraCIDR.value) {
      $mascara.value = notacaoCIDR($mascaraCIDR.value);
    }
    const classe = verificarClasse($ip.value);
    const mascara = verificarMascara($mascara.value, classe);
    const rede = verificarRede($ip.value, $mascara.value);
    const broadcast = verificarBroadcast($ip.value, $mascara.value);
    const host = verificarHost($mascara.value);
    const subrede = verificarSubrede(classe, $mascara.value);

    /* section result */
      
    const $secaoDeEntrada = document.querySelector('section');
    $secaoDeEntrada.insertAdjacentHTML('afterend', `<section class="result"></section>`);
     
    /* card */

    const $secaoResultado = document.querySelector('.result');

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Classe', classe));
    
    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('IP', ip.value, converterDecimalParaBinarioQuatroOctetos($ip.value)));

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Máscara', $mascara.value, converterDecimalParaBinarioQuatroOctetos($mascara.value)));

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Endereço de Rede', rede, converterDecimalParaBinarioQuatroOctetos(rede)));

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Endereço de Broadcast', broadcast, converterDecimalParaBinarioQuatroOctetos(broadcast)));
    
    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Quantidade de rede/sub-rede', subrede));

    $secaoResultado.insertAdjacentHTML('beforeend', criarCard('Quantidade de host por rede/sub-rede', host));
        
  } catch (error) {
    document.querySelector('body').insertAdjacentHTML('beforeend', 
    `<div class="result alert warning">
      <p>Verifique os valores inseridos</p>
    </div>`
    )
  }
});

function limparCampos(){
  document.querySelector('.result') ? document.querySelector('.result').remove() : "";
}

function criarCard(texto, valor1, valor2) {
  if (!!valor2) {
    return `<div class="card">
              <p>${texto}</p>
              <p>${valor1}</p>
              <p>${valor2}</p>
            </div>`
  } else {
    return `<div class="card">
              <p>${texto}</p>
              <p>${valor1}</p>
            </div>`
  }
}


function adjustTable() {
  const table = document.getElementById('result-table');
  const numCols = window.innerWidth >= 768 ? 4 : 2; // exibe 4 colunas em telas grandes e 2 em telas pequenas
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    while (row.cells.length > numCols) {
      row.deleteCell(numCols); // remove as células extras
    }
    while (row.cells.length < numCols) {
      row.insertCell(); // adiciona as células faltantes
    }
  }
}

adjustTable();
window.addEventListener('resize', adjustTable);

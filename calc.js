$(document).ready(function() {
    // Máscara para altura com até 1 dígito antes do ponto e 2 dígitos após o ponto
    $('#altura').mask('0,00', {reverse: true});
    // Máscara para peso com até 3 dígitos e duas casas decimais
    $('#peso').mask('000.00', {reverse: true});

    // Adiciona "m" ao final do valor da altura ao perder o foco
    $('#altura').on('blur', function() {
        let valor = $(this).val();
        if (valor && !valor.endsWith(' m')) {
            $(this).val(valor + ' m');
        }
    });

    // Remove "m" e ajusta o valor ao digitar
    $('#altura').on('focus', function() {
        let valor = $(this).val();
        if (valor.endsWith(' m')) {
            $(this).val(valor.slice(0, -2).trim());
        }
    });

    // Adiciona "kg" ao final do valor do peso ao perder o foco
    $('#peso').on('blur', function() {
        let valor = $(this).val();
        if (valor && !valor.endsWith(' kg')) {
            $(this).val(valor + ' kg');
        }
    });

    // Remove "kg" e ajusta o valor ao digitar
    $('#peso').on('focus', function() {
        let valor = $(this).val();
        if (valor.endsWith(' kg')) {
            $(this).val(valor.slice(0, -3).trim());
        }
    });
});

const calcular = document.getElementById('calcular');

function imc() {
    const nome = document.getElementById('nome').value;
    const alturaString = $('#altura').val().replace(' m', ''); // Remove "m" se estiver presente
    const altura = parseFloat(alturaString.replace(',', '.')); // Altura em metros
    const peso = parseFloat($('#peso').val().replace('.', '').replace(',', '.').replace(' kg', '')); // Peso em kg
    const resultado = document.getElementById('resultado');

    if (nome !== '' && !isNaN(altura) && !isNaN(peso) && altura > 0 && peso > 0) {
        const valorIMC = (peso / (altura * altura)).toFixed(2);

        let classificacao = '';
        if (valorIMC < 18.5) {
            classificacao = 'Abaixo do peso.';
        } else if (valorIMC < 25) {
            classificacao = 'com peso ideal.';
        } else if (valorIMC < 30) {
            classificacao = 'levemente acima do peso.';
        } else if (valorIMC < 35) {
            classificacao = 'você está com obesidade grau I.';
        } else if (valorIMC < 40) {
            classificacao = 'você está com obesidade grau II.';
        } else {
            classificacao = 'você está com obesidade grau III.';
        }

        // Calcula o intervalo de peso ideal
        const pesoIdealMinimo = (18.5 * altura * altura).toFixed(2);
        const pesoIdealMaximo = (24.9 * altura * altura).toFixed(2);

        let recomendacao = '';
        if (peso < pesoIdealMinimo) {
            const pesoNecessario = (pesoIdealMinimo - peso).toFixed(2);
            recomendacao = `Você precisa ganhar aproximadamente ${pesoNecessario} kg para atingir o peso ideal.`;
        } else if (peso > pesoIdealMaximo) {
            const pesoNecessario = (peso - pesoIdealMaximo).toFixed(2);
            recomendacao = `Você precisa perder aproximadamente ${pesoNecessario} kg para atingir o peso ideal.`;
        } else {
            recomendacao = 'Você está dentro da faixa de peso ideal.';
        }

        // Garante que a primeira letra da mensagem esteja em maiúscula
        const resultadoTexto = `${nome}, seu IMC é ${valorIMC} e você está ${classificacao} ${recomendacao}`;
        const resultadoTextoCapitalizado = resultadoTexto.charAt(0).toUpperCase() + resultadoTexto.slice(1);

        resultado.textContent = resultadoTextoCapitalizado;
    } else {
        resultado.textContent = 'Preencha todos os valores corretamente.';
    }
}

calcular.addEventListener('click', imc);

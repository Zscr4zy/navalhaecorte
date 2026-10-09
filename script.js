document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');

    // Bloqueia automaticamente datas passadas no calendário
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T');
        dateInput.setAttribute('min', today);
    }

    // CONFIGURAÇÃO DOS NÚMEROS DE WHATSAPP DOS BARBEIROS
    // IMPORTANTE: Altere os números fictícios abaixo pelos celulares REAIS com o DDD. Ex: '5584999999999'
    const telefonesBarbeiros = {
        'Carlos Silva': '5584999999999',
        'Renato Alencar': '5584999999999',
        'Marcos Souza': '5584999999999'
    };

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Captura as escolhas feitas no formulário
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const barber = document.getElementById('barber').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Formata a data americana para o padrão brasileiro (DD/MM/AAAA)
        const dateObj = new Date(date + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR');

        // Seleciona o número do WhatsApp do profissional correspondente
        const numeroDestino = telefonesBarbeiros[barber] || '5584999999999';

        // Cria e estrutura o texto limpo da mensagem com negritos (*)
        const textoMensagem = `Olá! Gostaria de confirmar um agendamento pelo site:\n\n` +
                              `• *Cliente:* ${name}\n` +
                              `• *WhatsApp do Cliente:* ${phone}\n` +
                              `• *Serviço:* ${service}\n` +
                              `• *Barbeiro:* ${barber}\n` +
                              `• *Data:* ${formattedDate}\n` +
                              `• *Horário:* ${time}h`;

        // Codifica os caracteres especiais para criar uma URL válida
        const textoCodificado = encodeURIComponent(textoMensagem);

        // Gera o endereço final da API pública do WhatsApp
        const urlWhatsapp = `https://whatsapp.com{numeroDestino}&text=${textoCodificado}`;

        // Abre uma nova aba direcionada diretamente ao chat correto
        window.open(urlWhatsapp, '_blank');
    });
});

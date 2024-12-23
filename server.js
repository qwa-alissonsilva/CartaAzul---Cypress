const express = require('express');
const { spawn } = require('child_process');

const app = express();
const PORT = 3001;
app.use(express.json());

app.post('/seguro-novo', (req, res) => {
    const { apolice, veiculos, pagamento, endossos } = req.body;

    const { apoliceTipo, qtdApolices, apoliceStatus, renovacao } = apolice;
    const { formaPagamento, parcelas } = pagamento;
    const { inclusao, exclusao, cancelamento } = endossos;

    const veiculosInfo = veiculos.map(veiculo => {
        return Object.keys(veiculo).map(key => `(${key}= ${veiculo[key]})`).join(',');
    });

    console.log('=============================================================================================================================================');
    console.log(`[APOLICE] (tipo: ${apoliceTipo}), (quantidade: ${qtdApolices}), (status: ${apoliceStatus}), (renovacao: ${renovacao})`);
    console.log(`[PAGAMENTO] (forma: ${formaPagamento}), (parcelas: ${parcelas})`);
    console.log(`[VEICULOS] ${veiculosInfo}`);
    
    const endossosLog = `[ENDOSSOS] ` +
        (inclusao ? 'inclusão' : '') +
        (exclusao ? (inclusao ? ', exclusão' : 'exclusão') : '') +
        (cancelamento ? ((inclusao || exclusao) ? ', cancelamento' : 'cancelamento') : '') ||
        'Nenhum endosso ativo';
    
    console.log(endossosLog);
    console.log('=============================================================================================================================================');

    // Monta o caminho do teste
    const testPath = 'D:\\Desenvolvimento\\Clone\\Porto\\Cypress\\Carta-Azul\\CartaAzul-Cypress\\cypress\\e2e\\Funcionalidades\\SeguroNovo-Renovação.cy.js';

    const child = spawn('npx', ['cypress', 'open', '--browser', 'edge'], { shell: true });

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('error', (err) => {
        console.error('Erro ao iniciar o processo:', err);
        return res.status(500).json({ error: 'Erro ao iniciar o Cypress' });
    });

    res.json({ message: 'Cypress está sendo iniciado. Verifique a janela do Cypress para ver os testes.' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
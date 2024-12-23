let documentosGerados = [];
let qtdApolices = Number(Cypress.env('qtdApolices')) || 1;

function transmitirApolice() {
    return new Cypress.Promise((resolve, reject) => {
        cy.Transmitir().then(() => {
            cy.get('@numeroDoc').then((numeroDoc) => {
                const status = Cypress.env('statusDocumento') || 'Desconhecido';
                const resultado = {
                    apoliceTipo: apoliceTipo,
                    numeroDocumento: numeroDoc,
                    status: status
                };
                resolve(resultado);
            }).catch((error) => {
                reject(error);
            });
        });
    });
}

beforeEach(() => {
    cy.AcessaCotacaoLocal();
    console.log('[Info] Acessando sistema Carta Azul');
});

describe('[Info] Criando Apolice do tipo:', () => {
    console.log(`[Info] Tipo de Apólice:`);
    
    for (let i = 0; i < qtdApolices; i++) {
        it(`Tipo de Apólice - Execução ${i + 1}`, () => {
            transmitirApolice().then((resultado) => {
                cy.log('Resultado da transmissão:', resultado);
                documentosGerados.push(resultado);
            });
        });
    }

    after(() => {
        const output = JSON.stringify(documentosGerados, null, 2);
        cy.writeFile('cypress/documentosGerados.json', output);
        cy.log('Documentos gerados salvos em documentosGerados.json');
        console.log('Documentos gerados:', documentosGerados);

        if (documentosGerados.length < qtdApolices) {
            console.log(`Documentos gerados (${documentosGerados.length}) são menores que qtdApolices (${qtdApolices}). Reiniciando a execução do teste...`);

            for (let i = documentosGerados.length; i < qtdApolices; i++) {
                transmitirApolice();
            }
        }
    });
});
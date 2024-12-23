  Cypress.Commands.add('NumeroOrcamento', () => {
   cy.get('.row.my-3 > :nth-child(2) > span', { timeout: 480000 })
  });
  

  Cypress.Commands.add('FormaPagamentoCalculo', () => {
    const numeroDeInstancias = 3;
    
    for (let i = 1; i <= numeroDeInstancias; i++) {
    cy.get(`:nth-child(${i}) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong`, { timeout: 480000 })
      .invoke('text').then((opcao1) => {
        const limparTexto = (texto) => texto.replace(/\s+/g, ' ').trim().replace(/^(\d+x de )?/, '');
  
        cy.get(`:nth-child(${i}) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(3) > #btn-formas-pagamento > .mat-mdc-button-touch-target`, { timeout: 480000 }).click({ force: true });
  
        const valorNumerico = (texto) => {
          return parseFloat(limparTexto(texto).replace(/[^\d,.-]/g, '').replace(',', '.'));
        };
  
        const tolerancia = 0.01;
  
        cy.get('#strong-parcela-0')
          .invoke('text')
          .then((text) => {
            expect(limparTexto(text)).to.eq(limparTexto(opcao1));
          });
  
        cy.get('#strong-parcela-1')
          .invoke('text')
          .then((text) => {
            const valorOpcao1 = valorNumerico(opcao1);
            const valorParcela1 = valorNumerico(text);
            expect(Math.abs(valorParcela1 - valorOpcao1 / 2)).to.be.lessThan(tolerancia);
          });
  
        cy.get('#strong-parcela-2')
          .invoke('text')
          .then((text) => {
            const valorOpcao1 = valorNumerico(opcao1);
            const valorParcela1 = valorNumerico(text);
            expect(Math.abs(valorParcela1 - valorOpcao1 / 3)).to.be.lessThan(tolerancia);
          });
  
        cy.get('#strong-parcela-3')
          .invoke('text')
          .then((text) => {
            const valorOpcao1 = valorNumerico(opcao1);
            const valorParcela1 = valorNumerico(text);
            expect(Math.abs(valorParcela1 - valorOpcao1 / 4)).to.be.lessThan(tolerancia);
          });
  
        cy.get('#strong-parcela-4')
          .invoke('text')
          .then((text) => {
            const valorOpcao1 = valorNumerico(opcao1);
            const valorParcela1 = valorNumerico(text);
            expect(Math.abs(valorParcela1 - valorOpcao1 / 5)).to.be.lessThan(tolerancia);
          });
  
        cy.get('#strong-parcela-5')
          .invoke('text')
          .then((text) => {
            const valorOpcao1 = valorNumerico(opcao1);
            const valorParcela1 = valorNumerico(text);
            expect(Math.abs(valorParcela1 - valorOpcao1 / 6)).to.be.lessThan(tolerancia);
          });
  
        cy.get('#strong-parcela-6')
          .invoke('text')
          .then((text) => {
            const valorOpcao1 = valorNumerico(opcao1);
            const valorParcela1 = valorNumerico(text);
            expect(Math.abs(valorParcela1 - valorOpcao1 / 7)).to.be.lessThan(tolerancia);
          });
      });

      cy.contains ('button','Fechar').click({ force: true });
    }
  });
  

  Cypress.Commands.add('Oferta', () => {
    cy.get(':nth-child(1) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-header > .mat-mdc-card-header-text > .mat-mdc-card-subtitle > strong').contains('Opção 1')
    cy.get(':nth-child(2) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-header > .mat-mdc-card-header-text > .mat-mdc-card-subtitle > strong').contains('Opção 2')
    cy.get(':nth-child(3) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-header > .mat-mdc-card-header-text > .mat-mdc-card-subtitle > strong').contains('Opção 3')
   });

   Cypress.Commands.add('ModalDesconto', () => {
    cy.get('#span-data-criacao').invoke('text').then((textDataCriacao) => {
      cy.get('#span-numero-orcamento').invoke('text').then((textOrcamento) => {
        cy.get('#span-cpfCnpj').invoke('text').then((textCpfCnpj) => {
          
          cy.get('#btn-descontos').click();
          
          cy.get('#modal-cpfCnpj').invoke('text').then((textCpfCnpjModal) => {
            expect(textCpfCnpj.trim()).to.equal(textCpfCnpjModal.trim());
          });
  
          cy.get('#modal-numero-orcamento').invoke('text').then((textOrcamentoModal) => {
            expect(textOrcamento.trim()).to.equal(textOrcamentoModal.trim());
          });
  
          cy.get('#modal-inicio-vigencia').invoke('text').then((textDataCriacaoModal) => {
            expect(textDataCriacaoModal.trim()).to.equal(textDataCriacao.trim());
          });
          const [day, month, year] = textDataCriacao.trim().split('/').map(Number);
          const dataCriacao = new Date(year, month - 1, day); 
  
          const dataValidadeEsperada = new Date(dataCriacao.setFullYear(dataCriacao.getFullYear() + 1));
          const dataValidadeEsperadaFormatada = formatDateToDDMMYYYY(dataValidadeEsperada);
  
          cy.get('#modal-final-vigencia').invoke('text').then((textDataValidadeModal) => {
            expect(textDataValidadeModal.trim()).to.equal(dataValidadeEsperadaFormatada);
          });
        });
      });
    });
  });
  
  
  

   Cypress.Commands.add('VerificaIntegridadeDados', () => {
    const nomeEsperado = Cypress.env('nomeGerado');   
    const cpfEsperado = Cypress.env('cpfGerado');  
    cy.get('#span-nome-segurado', { timeout: 480000 }).invoke('text').then((text) => {
   
      const textoLimpo = text.trim().replace(/\u00A0/g, ''); 
      // expect(textoLimpo).to.equal(Cypress.env('nomeGerado').toUpperCase());
  });


  cy.get('#span-cpfCnpj').invoke('text').then((cpfCnpjTexto) => {
    const textoSemFormatacao = cpfCnpjTexto.replace(/\D/g, ''); 
    const cpfGerado = Cypress.env('cpfGerado');
    // expect(textoSemFormatacao).to.equal(cpfGerado);
  });

  cy.get('#span-numero-orcamento').invoke('text').then((numeroDoc) => {
    Cypress.env('numeroDoc', numeroDoc);
  });
  
    cy.verificaDatas()
     });

     Cypress.Commands.add('verificaDatas', () => {
      const dataHoje = new Date();
      const dataHojeFormatada = formatarData(dataHoje);
    
      cy.get('#span-data-criacao').invoke('text').then((dataCriacao) => {
        expect(dataCriacao.trim()).to.equal(dataHojeFormatada);
      });
  
      const dataValidade = new Date(dataHoje);
      dataValidade.setMonth(dataValidade.getMonth() + 1); 
      const dataValidadeFormatada = formatarData(dataValidade);
    
      cy.get('#span-data-validade').invoke('text').then((dataValidadeElemento) => {
        expect(dataValidadeElemento.trim()).to.equal(dataValidadeFormatada);
      });
    });

   Cypress.Commands.add('Percentual', () => {
    cy.insereNumLetra('input[formcontrolname="percentualAplicado"]',10);
     });

     Cypress.Commands.add('TipoDeDesconto', () => {
      cy.get('mat-select[formcontrolname="tipoDesconto"]').click();
      cy.contains('Agravo')
      cy.contains('Desconto');
      cy.contains('mat-option', 'Desconto').click();

       });

       Cypress.Commands.add('RemoverAjustes', () => {
        cy.contains('Remover ajustes').click()
        cy.get('input[type="number"]').invoke('val').should('eq', ''); 
          cy.get('mat-select[formcontrolname="tipoDesconto"]').then($select => {
            expect($select.text().trim()).to.be.empty;
          });

        });

        Cypress.Commands.add('FecharModal', () => {
         cy.contains('Fechar').click()
          });

          Cypress.Commands.add('VerificaPDF', () => {
            cy.get(':nth-child(1) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong', { timeout: 480000 })
              .invoke('text').then((opcao1) => {
                cy.get(':nth-child(2) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong')
                  .invoke('text').then((opcao2) => {
                    cy.get(':nth-child(3) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong')
                      .invoke('text').then((opcao3) => {
                        const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
                        
                        cy.log('Opção 1: ' + normalizeText(opcao1));
                        cy.log('Opção 2: ' + normalizeText(opcao2));
                        cy.log('Opção 3: ' + normalizeText(opcao3));
                        
                        cy.get('#btn-gerar-pdf').click();
                        
                        cy.get('span.d-flex.justify-content-end > strong').eq(0).invoke('text').then((pdfContent) => {
                          const normalizedPdfContent = normalizeText(pdfContent);
                          cy.log('Conteúdo do PDF (1): ' + normalizedPdfContent);
                          
                          expect(normalizedPdfContent).to.eq(normalizeText(opcao1)); 
                        });
          
                        cy.get('span.d-flex.justify-content-end > strong').eq(1).invoke('text').then((pdfContent) => {
                          const normalizedPdfContent = normalizeText(pdfContent);
                          cy.log('Conteúdo do PDF (2): ' + normalizedPdfContent);
                          
                          expect(normalizedPdfContent).to.eq(normalizeText(opcao2)); 
                        });
          
                        cy.get('span.d-flex.justify-content-end > strong').eq(2).invoke('text').then((pdfContent) => {
                          const normalizedPdfContent = normalizeText(pdfContent);
                          cy.log('Conteúdo do PDF (3): ' + normalizedPdfContent);
                          
                          expect(normalizedPdfContent).to.eq(normalizeText(opcao3)); 
                        });
                      });
                  });
              });
          });

          Cypress.Commands.add('GerarPDF', () => {
            cy.intercept('GET', '/api/carta-azul//v1/impressoes/gerarPDF**').as('gerarPDF'); 
            cy.get(`#checkbox-pdf-oferta-1-input`).click();    
            cy.get('#gerar-pdf').click(); 
            cy.wait('@gerarPDF').its('response.statusCode').should('eq', 200);  
          });
          
          
          Cypress.Commands.add('AplicarDescontoSobreAgravo', () => {
            cy.get(':nth-child(1) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong')
              .invoke('text')
              .then((texto) => {
                cy.log('Texto original após ajuste: ' + texto);
                
                const textoLimpo1 = texto.replace('US$', '').replace(',', '.').trim();
                const valorOriginal = parseFloat(textoLimpo1);
                cy.log('Valor original: ' + valorOriginal);
          
                cy.contains('button', 'Descontos').click();
                cy.get('mat-select[formControlName="tipoDesconto"]').click();
                cy.contains('Agravo').click();
                cy.get('input[formControlName="percentualAplicado"]').clear().type('5');
                cy.contains('Aplicar Descontos').click();
          
                cy.wait(5000); 
                cy.get(':nth-child(1) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong')
                  .invoke('text')
                  .then((texto) => {
                    cy.log('Texto original após ajuste: ' + texto);
                    
                    const textoLimpo2 = texto.replace('US$', '').replace(',', '.').trim();
                    const valorAtualizado = parseFloat(textoLimpo2);
                    cy.log('Valor atualizado: ' + valorAtualizado);
                    const valorEsperado = valorOriginal * (1 + 5 / 100);
          
                    expect(valorAtualizado).to.be.closeTo(valorEsperado, 0.01); 
                  });
              });
          });
          
          Cypress.Commands.add('testaSlider', () => {
            cy.get(':nth-child(1) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > .align-items-center > .col > #mat-slider > #input-percentualComissao').invoke('val', 0).trigger('input').trigger('change');
            
            cy.wait(3000);
            
            cy.get(':nth-child(1) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong')
                .should('be.visible')  
                .invoke('text')
                .then((texto1) => {
                    const valor1 = parseFloat(texto1.replace('US$', '').replace(/\s/g, '').replace(',', '.'));
                    cy.log(`Valor 1: ${valor1}`);
                    
                    cy.get('#input-slider').invoke('val', 15).trigger('input').trigger('change');
                    
                    cy.wait(3000);
                    
                    cy.get(':nth-child(1) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong')
                        .should('be.visible')  
                        .invoke('text')
                        .then((texto2) => {
                            const valor2 = parseFloat(texto2.replace('US$', '').replace(/\s/g, '').replace(',', '.'));
                            cy.log(`Valor 2: ${valor2}`);
                            
                            const esperado = valor1 * 1.15;
                            const tolerancia = 0.01; 
                            expect(Math.abs(valor2 - esperado)).to.be.lessThan(tolerancia);
                        });
                });
        });

        Cypress.Commands.add('PegaValorPremio', () => {
          cy.get(':nth-child(1) > app-resultado-card-oferta > .mat-mdc-card > .mat-mdc-card-content > :nth-child(1) > :nth-child(2) > h3 > strong')
          .invoke('text')
          .then((texto) => {
            cy.log('Texto original após ajuste: ' + texto);
            
            const textoLimpo = texto.replace('US$', '').replace(',', '.');
            cy.log('Texto limpo após ajuste: ' + textoLimpo);
          });
        });

        function PegaValorPremio() {

        
          return base + digito1 + digito2;
        }
          
        const formatarData = (data) => {
          const dia = String(data.getDate()).padStart(2, '0');
          const mes = String(data.getMonth() + 1).padStart(2, '0'); 
          const ano = data.getFullYear();
          return `${dia}/${mes}/${ano}`; 
        };
        function formatDateToDDMMYYYY(date) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
 

  
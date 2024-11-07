describe("Testes de back-end para o formulário de dúvidas da PagBrasil"), () => {
    beforeEach(() => {
        cy.visit('https://www.pagbrasil.com/fb831484f9611648f05411b3746466b6/form.html')
    })
}

it('Valida no back o envio com sucesso com todos os campos preenchidos', () => {

    cy.get('#name').type('Pedro')
    cy.get('#email').type('pedro@teste.com')
    cy.get('#company').type('Empresa do Pedro')
    cy.get('#website').type('https://www.empresapedro.com')
    cy.get('#phone').type('(51)9999-9999')
    cy.get('#inquiry').type('Tenho uma dúvida sobre os produtos x,y e z')

    cy.intercept("POST", "https://www.pagbrasil.com/fb831484f9611648f05411b3746466b6/form.json")

    //aqui é validado se os dados inseridos no formulário estão batendo na requisição
    expect(req.body).to.include({
        name: 'Pedro',
        email: 'pedro@teste.com',
        company: 'Empresa do Pedro',
        website: 'https://www.empresapedro.com',
        phone: '(51)9999-9999',
        inquiry: 'Tenho uma dúvida sobre os produtos x,y e z'

    })

    req.reply({
        statusCode: 200,
        body: {
            sucesso: true
        }
    })

        .as('enviaForm')

    //envio do formulário para validação da requisição interceptada
    cy.get('button[type="submit"]').click()

    cy.wait('@enviaForm').then((interceptação) => {

        expect(interceptação.responde.statusCode).to.eq(200)
        expect(interceptação.response.body).to.deep.equal({
            sucesso: true
        })

    })


})

//variação do teste acima mas com requisição de erro. Um pouco mais curto, sem validação declarada do que foi enviado campo a campo, somente pegando o status final

it('Valida no back o envio com erro do formulário com o Name em branco', () => {

    cy.get('#name').type('')
    cy.get('#email').type('pedro@teste.com')
    cy.get('#company').type('Empresa do Pedro')
    cy.get('#website').type('https://www.empresapedro.com')
    cy.get('#phone').type('(51)9999-9999')
    cy.get('#inquiry').type('Tenho uma dúvida sobre os produtos x,y e z')

    cy.intercept({
        method: 'POST',
        url: 'https://www.pagbrasil.com/fb831484f9611648f05411b3746466b6/api/contact'
    },
        {
            statusCode: 412,
            body: {
                sucesso: false, "erro": 'Campo Name inválido.'
            }
        })

        .as('enviaForm')

    //envio do formulário para validação da requisição interceptada
    cy.get('button[type="submit"]').click()

    cy.wait('@enviaForm').then((interceptação) => {

        expect(interceptação.response.body).to.have.property('sucesso', false);
        expect(interceptação.response.body).to.have.property('erro', 'Campo Name inválido.')

    })

})

it('Valida no back o envio com erro do formulário com o Name com caracteres especiais', () => {

    cy.get('#name').type('Pedro! Gued3s _Puntel$$')
    cy.get('#email').type('pedro@teste.com')
    cy.get('#company').type('Empresa do Pedro')
    cy.get('#website').type('https://www.empresapedro.com')
    cy.get('#phone').type('(51)9999-9999')
    cy.get('#inquiry').type('Tenho uma dúvida sobre os produtos x,y e z')

    cy.intercept({
        method: 'POST',
        url: 'https://www.pagbrasil.com/fb831484f9611648f05411b3746466b6/api/'
    },
        {
            statusCode: 412,
            body: {
                sucesso: false, "erro": 'Campo Name inválido.'
            }
        })

        .as('enviaForm')

    //envio do formulário para validação da requisição interceptada
    cy.get('button[type="submit"]').click()

    cy.wait('@enviaForm').then((interceptação) => {

        expect(interceptação.response.body).to.have.property('sucesso', false);
        expect(interceptação.response.body).to.have.property('erro', 'Campo Name inválido.')

    })

    
        it('Deve enviar a requisição com sucesso em até 1 segundo', () => {         
         
          
            cy.get('#name').type('Pedro')
            cy.get('#email').type('pedro@teste.com')
            cy.get('#company').type('Empresa do Pedro')
            cy.get('#website').type('https://www.empresapedro.com')
            cy.get('#phone').type('(51)9999-9999')
            cy.get('#inquiry').type('Tenho uma dúvida sobre os produtos x,y e z')
      
        
          cy.intercept('POST', 'https://www.pagbrasil.com/fb831484f9611648f05411b3746466b6/api/').as('enviaReq');
      
          cy.get('button[type="submit"]').click()
      
          cy.wait('@enviaReq', { timeout: 1000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.get('form').submit();

            // Valida o tempo de resposta
            const tempoResposta = interception.response.duration;
            expect(tempoResposta).to.be.lessThan(1000, 'Response time is under 1 second');
          });
        })           

})





import { faker } from '@faker-js/faker';

context('Testes no formulário de dúvidas', () => {
    beforeEach(() => {
        cy.visit('https://www.pagbrasil.com/fb831484f9611648f05411b3746466b6/form.html')
    })

    describe('Envio de dados no formulário', () => {
        const user = {
            nameValido: faker.person.fullName().substring(1, 255),
            email: faker.internet.email().substring(1, 150),
            company: faker.commerce.department().substring(1, 200),
            url: faker.internet.url().substring(1, 200),
            phone: faker.phone.number({ style: 'national' }).substring(1, 15),
            inquiry: faker.lorem.text().substring(1, 500)

        }


        it('Valida a abertura correta do formulário', () => {
            cy.contains('h2', "I'm already using PagBrasil and have questions").should('be.visible')
        })

        it('Valida no front o envio com sucesso com todos os campos preenchidos', () => {

            cy.get('#name').type(user.nameValido)
            cy.get('#email').type(user.email)
            cy.get('#company').type(user.company)
            cy.get('#website').type(user.url)
            cy.get('#phone').type(user.phone)
            cy.get('#inquiry').type(user.inquiry)
            cy.get('button[type="submit"]').click();
            cy.contains('#successMessage', 'Form submitted successfully!').should('be.visible')

        })

        it('Valida erro ao enviar formulário todo vazio', () => {

            cy.get('button[type="submit"]').click();
            cy.get('#error').should('be.visible')

        })

        it('Valida o envio com somente o campo Name preenchido', () => {
            cy.get('#name').type(user.name)
            cy.get('button[type="submit"]').click()
            cy.get('#error').should('be.visible')
        })

        it('Envio do formulário com o e-mail em formato incorreto', () => {
            cy.get('#name').type(user.name)
            cy.get('#email').type('testeteste.com')
            cy.get('#company').type(user.company)
            cy.get('#website').type(user.url)
            cy.get('#phone').type(user.phone)
            cy.get('#inquiry').type(user.inquiry)
            cy.get('button[type="submit"]').click();
            cy.get('#error', 'Campo E-mail inválido.').should('be.visible')
        })


        it('Envio do formulário com o Website em formato incorreto', () => {
            cy.get('#name').type(user.name)
            cy.get('#email').type(user.email)
            cy.get('#company').type(user.company)
            cy.get('#website').type('https://teste.com.br')
            cy.get('#phone').type(user.phone)
            cy.get('#inquiry').type(user.inquiry)
            cy.get('button[type="submit"]').click();
            cy.get('#error', 'Campo Website inválido.').should('be.visible')
        })

        it('Envio do formulário com todos os campos excedendo o limite de caracteres Name (256), E-mail(151), Company (201), Website (201), Phone (16), Inquiry (501', () => {

            cy.get('#name').type('um. Suscipit sit deputo uterque vulariter clementia sed.Alo sonitus depono repellendus vel baiulus ipsum tantillus. Tardus adduco apparatus impedit. Caterva conventus tristis vetus exercitationem conatus. sonitus depono repellendus vel baiulus ipsum tanti.')
            cy.get('#email').type('SenbujX5jNK61wGNnNe9VCKLRaPRfJOpXiCxm1kGuor6i1OqU3nHDsu0BaKRc0FM0cFOoocvLtw1dafDNFrRiUzAxenuCsimdL8dVFxRYQN3XrGUhC8cFldzsAsWJmiWEgViOfuvBrx7S@teste.com')
            cy.get('#company').type('sDnWNKgW XlgzgwP5OmeWTb1iM mqBOL9o TVsSScuKcEJ28Cs8WSk28cDDaa0mAXMgSfkZSZYM0GGXQwQqOrFqE5 z8ci996 rA9yWhatAha31vsgQfE90L66YHz1wPaQ9zCtyKrob4cY0k0uXfqISyI5UBNPDw0 kdqL87mbcuLwRztr7ixaaLnP Ej9dzsnbfRcMW')
            cy.get('#website').type('https://www.TESTEMeA3Gkwaxea04JhEh9p84prinIQX9kQPA2Ec4uapWtFMv4LVFSxXRKiGesbQ7tFZGIL9VAsdg6uHwZ1c5Uw0MwCG7HyxZ9U9JHq6ft2FOZuT2kbtRTSwSt7kbrXVXmuIjUHkWeWYRPeCED0SVtr3X3O60b7DgKRMjSFIgQtQnxtc3hwTVqsF.com')
            cy.get('#phone').type('(51)999999-99999')
            cy.get('#inquiry').type('Fhfvu012LW4j5zOXx ZJ0M87PSnzV2Vryt1CkynXge0ZuEOWBSE 2qxA5xfUQ2kIal4XhppCvK0QJUpIHpnaKrN4XognJHxwe3lscLGHu2n4osq3VvymxYwo4WkOofxMxbx0tjM4Gypg2Oi9cznGC84KzxauLOg1GrgQjafAsu7Obn5SYYMV8wflcfeOO6rGh LC9GW4HRP 4vn8eaXcHHShE6wVSJlNjze88HZj99q 6WPOZFyAYpfALDvxTvtHvJQVW7Er7zQExjR onrkCCfeJuTZHcEnefBf9fNx8A5zhY6eJqCTaXKl4kyCyI02R27DAigEBbczTJOjSO3q8thn9moNm6etIMopk3FZvU2PoyidjV4zQW3dx8X3DiEZExyeXmhxG2 zh5e1uerE3WUWALr7NmMBjCh6nBTI8cmICEXmSFIgWooJTbe8EHpgD7c10juNYIfxqUNiEaVFb886OFGjktq8aVrEnzwWWkoRvZqCVHSp')
            cy.get('button[type="submit"]').click();
            cy.get('#error').should('be.visible')         

        })

        it('Envio do formulário com o campo Name utilizando caracteres especiais', () => {
            cy.get('#name').type('Pedro. Guedes! @2')
            cy.get('#email').type(user.email)
            cy.get('#company').type(user.company)
            cy.get('#website').type(user.url)
            cy.get('#phone').type(user.phone)
            cy.get('#inquiry').type(user.inquiry)
            cy.get('button[type="submit"]').click();
            cy.get('#error', 'Campo Name inválido.').should('be.visible')
        })

        it('Envio do formulário com o campo Company utilizando caracteres especiais', () => {
            cy.get('#name').type(user.name)
            cy.get('#email').type(user.email)
            cy.get('#company').type('#Empresa! de_T3ste5')
            cy.get('#website').type(user.url)
            cy.get('#phone').type(user.phone)
            cy.get('#inquiry').type(user.inquiry)
            cy.get('button[type="submit"]').click();
            cy.get('#error', 'Campo Company inválido.').should('be.visible')
        })

        it('Envio do formulário com o campo Phone utilizando caracteres alfanuméricos e especiais', () => {
            cy.get('#name').type(user.name)
            cy.get('#email').type(user.email)
            cy.get('#company').type(user.company)
            cy.get('#website').type(user.url)
            cy.get('#phone').type('A(41!}993,44P')
            cy.get('#inquiry').type(user.inquiry)
            cy.get('button[type="submit"]').click();
            cy.get('#error', 'Campo Phone inválido.').should('be.visible')
        })

        it('Envio do formulário com o campo Iniquiry utilizando caracteres especiais', () => {
            cy.get('#name').type(user.name)
            cy.get('#email').type(user.email)
            cy.get('#company').type(user.company)
            cy.get('#website').type(user.url)
            cy.get('#phone').type(user.phone)
            cy.get('#inquiry').type('Tenho um@ dúvida! sobre %os produtos# X,Y E (3)')
            cy.get('button[type="submit"]').click();
            cy.get('#error', 'Campo Inquiry inválido.').should('be.visible')
        })

    })
})

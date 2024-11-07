Feature: Envio de Formulário

Cenario: Envio válido
Dado que eu estou na página do formulário
Quando e informei name, e-mail, company, website, phone e inquiry válidos
E cliquei em Submit
Então deve ser apresentada a mensagem "Form submitted successfully!"


Cenário: enviando o formulário com todos os campos em branco:
Quando eu deixar todos os campos em branco
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “Name” com o seguinte conteúdo: “Campo nome inválido.”


Cenário: enviando o formulário com um nome em formato válido sem preencher outros campos:
Quando eu preencher o campo “Name” com um formato válido de até 255 caracteres
E deixar todos os outros campos existentes em branco
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “E-mail” com a mensagem “Campo e-mail inválido.”


Cenário: enviando o formulário com o campo “E-mail” preenchido em formato válido e os demais em branco
Quando eu preencher o campo “E-mail” com um formato válido de até 150 caracteres
E deixar todos os outros campos do formulário em branco
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “Name” com o seguinte conteúdo: “Campo Name inválido.”


Cenário: enviando o formulário com os campos “Name” e “E-mail” preenchidos e em formato válido e os demais campos em branco
Quando eu preencher o campo “Name” com um formato válido de até 255 caracteres
E preencher o campo “E-mail” com um formato válido de até 150 caracteres
E deixar todos os outros campos em branco
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “Company” com o seguinte conteúdo: “Campo Company inválido.”

Cenário: enviando o formulário com os campos “Name”, “E-mail” e “Company” preenchidos e em formato válido e os demais campos em branco
Quando eu preencher o campo “Name” com um formato válido de até 255 caracteres
E preencher o campo “E-mail” com um formato válido de até 150 caracteres
E preencher o campo “Company” com um formato válido de até 200 caracteres
E deixar todos os outros campos em branco
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “Phone” com o seguinte conteúdo: “Campo Phone inválido.”


Cenário: enviando o formulário com somente o campo “Inquiry” em branco e os demais preenchidos em formato válido
Quando eu preencher os campos “Name”, “E-mail”, “Company”, “Website” e “Phone” em formato válido
E deixar o campo “Inquiry” em branco
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “Inquiry” com o seguinte conteúdo: “Campo Inquiry inválido".


Cenário: enviando o formulário com o campo “E-mail” em formato inválido
Quando eu preencher os campos “Name”, “Company”, “Phone” e “Inquiry” em formato válido
E preencher o campo e-mail com o conteúdo “testando.com”
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “E-mail” com a mensagem “Campo e-mail inválido.”

Cenário: enviando o formulário com o campo “Website” em formato inválido
Quando eu preencher os campos “Name”, “E-mail”. “Company”, “Phone” e “Inquiry” em formato válido
E preencher o campo “Website” com o conteúdo “www.teste.com”
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “Website” com a mensagem “Campo Website inválido.”

Cenário: enviando o formulário com o campo “Name” preenchido e excedendo o limite de caracteres
Quando eu preencher o campo “Name” com um conteúdo de 256 caracteres
E preencher os campos obrigatórios “E-mail”, “Company”, “Phone” e “Inquiry” em formato válido
E clicar no botão “Submit”
Então eu devo receber uma mensagem impeditiva no campo “Name” com o seguinte conteúdo: “Campo Name inválido.”

Cenário: enviando o formulário com o campo "Name" preenchido com caracteres especiais
Quando eu preeencher o campo "Name" com "Pedro! @Guedes43"
E preencher os demais campos obrigatórios com formato válido
Então eu devo receber uma mensagem impeditiva no campo “Name” com o seguinte conteúdo: “Campo Name inválido.”

Cenario: Envio válido com validação back-end de status code
Dado que o usuário está na página do formulário
Quando e informa name, e-mail, company, website, phone e inquiry válidos
E clica em Submit
Então deve a requisição deve retornar um status code 200"

Cenario: Envio válido com validação back-end de tempo da requisição
Dado que o usuário está na página do formulário
Quando e informa name, e-mail, company, website, phone e inquiry válidos
E clica em Submit
Então deve a requisição deve ser enviada com sucesso em até 1 segundo

Cenário: Envio inválido com validação back-end de status code:
Quando eu deixar todos os campos em branco
E clicar no botão “Submit”
Então deve a requisição retornar um status code 412



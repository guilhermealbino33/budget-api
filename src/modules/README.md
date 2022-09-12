## Duvidas

**Address**
[] - Cidades e estados, será rodado um script ou pegar da api do IBGE?
[] - Relação Cidades e estados, será many to many?

**createBudget**
[x] - Produtos serão criados separadamente e vinculados aos orçametos quando for cria-los?

**Updates**
[] - Ver melhor forma de fazer, principalmente customers e salesman

## Fazer

[] - Validar se é PJ ou PF e ai exigir CPF ou CNPJ
[] - Swagger
[] - seed de usuarios
[] - Metodo de find all/get all
[] - Adicionar valor do frete no calculo de value
[] - Adicionar imagem ao produto deve ser separado do criar produto
[] - Resolver relações da tabela budget -> customer
[] - Resolver relações da tabela budget -> salesman
[] - Resolver relações da tabela budget -> additional items
[] - Resolver relações da tabela budget -> products
[] - Resolver relações da tabela customer -> states -> cities
[] - Resolver relações da tabela salesman -> states -> cities
[] - Addtional items só sera criará items quando eu estiver criando um orçamento
[] - Resolver situações com endereços (fks entre tabelas)
[] - Diferença entre PF e PJ
[] - Categoria, Tipo de Frete, Cidade/Estado, serão enumereds ou tabelas em banco?
[] - Salvar como pdf

## Feito

[x] - Criar crud additionalItems. Com name, value, creation date - many to many
[x] - Tabelas de cidade e UF
[x] - createBudgetProduct
[x] - createBudgetAdditionalItems
[x] - Add phone_number1 e phone_number2 (customers e salesman)
[x] - Resolver loop ao criar customer

## Testar

[] - calculateTotalValue - createBudget

## Observações

- createBudget, passará na criação id de salesman e customer. Os products e additional items serão criados em tabelas separadas.
- createBudgetProduct - passará o id de budget e os products em use case separado
- createBudgetAdditionalItems - passará o id de budget e os AdditionalItems em use case separado

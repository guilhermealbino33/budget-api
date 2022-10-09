## Fazer

**Budgets**
[] - Salvar como pdf: -https://medium.com/swlh/generating-pdf-from-html-and-data-json-using-node-js-express-js-handlebars-and-puppeteer-b4a376a98abd
[] - Swagger

## Testar

## Duvidas

**Products**
[] - Validar criação de imagem
[] - Validar deleção de imagem

## Observações

- createBudget, passará na criação id de salesman e customer. Os products e additional items serão criados em tabelas separadas.
- createBudgetProduct - passará o id de budget e os products em use case separado
- createBudgetAdditionalItems - passará o id de budget e os AdditionalItems em use case separado

## Feito

[x] - Criar crud additionalItems. Com name, value, creation date - many to many
[x] - Tabelas de cidade e UF
[x] - createBudgetProduct
[x] - createBudgetAdditionalItems
[x] - Add phone_number1 e phone_number2 (customers e salesman)
[x] - Resolver loop ao criar customer
[x] - Validar se é PJ ou PF e ai exigir CPF ou CNPJ
[x] - Metodo de find all/get all LIST
[x] - Diferença entre PF e PJ
[x] - Adicionar valor do frete no calculo de value
[x] - Resolver situações com endereços (fks entre tabelas)
[x] - Resolver relações da tabela budget -> customer
[x] - Resolver relações da tabela budget -> salesman
[x] - Resolver relações da tabela budget -> additional items
[x] - Resolver relações da tabela budget -> products
[x] - Resolver relações da tabela customer -> states -> cities
[x] - Resolver relações da tabela salesman -> states -> cities
[x] - CreateBudget - Criação de orçamento com produto, cliente e vendedor
[x] - update additionalItem Verificar a questão da tipagem
[x] - teste - calculateTotalValue - createBudget
[x] - teste - criar budget com additionalItem
[x] - Ver melhor forma de fazer, principalmente customers e salesmen - https://typeorm.io/update-query-builder
[x] - Metodo closeBudgetUseCase
[x] - Categoria [x], Tipo de Frete[n], Cidade/Estado[x], serão enumereds ou tabelas em banco?
[x] - Seed de user
[x] - Addtional items só sera criará items quando eu estiver criando um orçamento
[x] - updates Verificar a questão da tipagem (se está certo usar interface)
[x] - show budget com todas as informações
[x] - Relacionar cidades e estados de forma que estados tenham um aray de cidades, que possam ser listadas quando um estado for selecionado
[x] - Verificar se a relação está correta - budgets
[x] - teste - delete images (ver se deleta no aws e no repositorio)
[x] - teste - delete budget
[x] - list all users. Tirar o password da view
[x] - teste - updateAdditionalItem
[x] - Metodo updateBudgetUseCase: Está realizando o update, porém não está incluindo produtos novos, por exemplo. Está sempre substituindo (olhar como está fazendo no additional_items)

## Products

- Haverá uma propriedade images do tipo array de
- Na rota uploadImages ele fará o upload com o S3 e chamará o repositório de products salvando a alteração.

[x] - Products deverá possuir um campo images: string []
[x] - A rota de criação de imagem salvará o link da imagem no objeto do produto
[x] - O S3 deverá excluir a imagem do tmp depois de subi-la para o AWS

**Address**
[x] - Cidades e estados, será rodado um script ou pegar da api do IBGE?
[x] - Relação Cidades e estados, será many to many?

**createBudget**
[x] - Produtos serão criados separadamente e vinculados aos orçametos quando for cria-los?
[x] - Quantidade dos produtos e items adcionais deverão ser consideradas no somatório do total value
[x] - Frete

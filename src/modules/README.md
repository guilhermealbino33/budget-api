# TODO

## Budget **priority**

[] - Modelo HTML para impressão em PDF
[x] - List com Paginação: page e limit pelo params
[x] - Ao invés de closed, fazer status: approved, sent, canceled
[x] - count
[x] - count de budget com status = approved
[x] - colocar verificação para os campos required

## CITIES

[] - List com Paginação: page e limit pelo params
[] - query by name

## STATES

[] - List com Paginação: page e limit pelo params
[] - query by name

## USER

[x] - Colocar regra if (role === 'admin') {user.is_admin = true}
[x] - Colocar regra if (role === 'admin') {user.is_admin = true} no update
[x] - mostrar role no get
[x] - erro ao alterar password
[] - List com Paginação: page e limit pelo params

## PRODUCTS

[x] - List com Paginação: page e limit pelo params
[x] - count
[x] - colocar verificação para os campos required
[x] - adicionar campo: installation_area
[x] - testar criar um repositorio de categorias proprio para produtos
[] - Alterar installation_area para number
[] - multiplicar installation_area ao alterar quantidade

## ADDITIONAL ITEMS

[x] - List com Paginação: page e limit pelo params
[x] - colocar verificação para os campos required
[x] - query by name

## SALESMAN

[x] - Adicionar campo city_code
[x] - List com Paginação: page e limit pelo params
[x] - verificar se complement está indo null
[x] - colocar verificação para os campos required

## CUSTOMER

[x] - List com Paginação: page e limit pelo params
[x] - count
[x] - Verificar o campo requester - está sempre null
[x] - Adicionar campo city_code
[x] - colocar verificação para os campos required

## CATEGORIES

[x] - List com Paginação: page e limit pelo params
[x] - query by name
[x] - colocar verificação para os campos required

## DASHBOARD

[x] - Um endpoint para cada modulo -> Grafico -> count: budgets, customers, sales, products

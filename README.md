<h1 align="center">TST Web Scraper</h1>

<h2 align="center">Scraper de Jurisprudências do TST</h2><br>
<p align="center">
  Traz em cada registro dados como <strong>número</strong>, <strong>tipo</strong>, <strong>ementa</strong>, <strong>numero</strong>, <strong>datas</strong>, <strong>relator</strong>, <strong>temas</strong>, <strong>inteiro teor em HTML</strong>, dentre outros<br>
</p>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Pré-requisitos: Docker ou Node v12 em diante

## Primeiros passos

Para começar clone o projeto

```sh
git clone git@github.com:thiagocmoreira/web-scraper-tst.git
```

Instale as dependências

```sh
yarn install
```

Na raiz do projeto crie o diretório `/data`. Nele será armazenado, além das jurisprudências, informações como a _data da publicação_ inicial que deseja baixar os registros, offset atual das requisições de cada data de publicação e erros de qualquer tipo.

Após criar o `/data` na raiz, dentro dela crie dois diretórios:

- `/registers`: serão salvos JSONs com as jurisprudências;
- `/offsets`: serão salvos os offsets atuais das requisições por data de publicação

Após isso, ainda no `/data`, crie dois arquivos:

- `current-date.json`: terá a data de publicação inicial que deseja baixar os dados. Ele deve seguir o padrão abaixo, de acordo a data escolhida:

```json
{ "dataFinal": "aaaa-mm-dd" }
```

- `errors.json`: será salvo as datas que ocorrerem algum tipo de erro. Ele deve seguir o padrão abaixo

```json
{ "errors": [] }
```

A estrutura final dese estar assim:

```
web-scraper-tst/
 ├── data/
 │  ├── offsets/
 │  ├── registers/
 │  ├── current-date.json
 │  └── errors.json
 ├── src/
 ├── ...
 ├── package.json
 ├── README.md
 └── yarn.lock
```

Após isso, o projeto está pronto para ser rodado.

## Configurações

Além do dia escolhido no `current-date.json`, é possível selecionar outras informações adicionais antes de executar o scraper do TST.

- _Número de dias_: O número de dias padrão para baixar as jurisprudências são `5`. Isso significa que o scraper vai baixar as jurisprudências da data descrita no `current-date.json` até 5 dias depois. Para mudar este valor basta mudar o valor da constante `intervals` no arquivo `src/index.js`.
- _Tipo de jurisprudência_: Por padrão, o scraper baixa apenas _Acórdãos_. Para alterar basta adicionar os tipos escolhidos na constante `jurisTypes` no arquivo `src/index.js`.

## Rodando

Para rodar o scraper, basta executar o comando abaixo:

```sh
yarn start
```

Após isso, os registros serão salvos na pasta `/data/registers`. Cada data de publicação gerará um diretório novo, e à cada requisição com um novo offset, será gerado um JSON contendo as jurisprudências correspondentes.

É possível acompanhar o progresso atrvés dos logs da aplicação.

<p align="center">
  <a href="https://orangetesting.com" target="_blank">
    <img alt="Orange Testing Logo" width="100" src="https://i0.wp.com/orangetesting.com/wp-content/uploads/2022/10/Robo-tablet.png?w=260&ssl=1">
  </a>
</p>

<p align="center">
  <!--a href="https://github.com/OrangeTesting00/orange-testing/actions?query=workflow%3ACI">
    <img src="https://github.com/OrangeTesting00/orange-testing/workflows/CI/badge.svg?branch=master&event=push" alt="CI badge">
  </a-->
  <a href="https://codecov.io/gh/orangetesting/orangetesting">
    <img src="https://img.shields.io/codecov/c/github/orange-testing/orange-testing.svg" alt="Coverage">
  </a>
  <a href="https://www.npmjs.com/package/orangetesting">
    <img src="https://img.shields.io/npm/dt/orangetesting.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/orangetesting">
    <img src="https://img.shields.io/npm/dm/orangetesting.svg" alt="Downloads">
  </a>
</p>
<p align="center">
  <a href="https://github.com/OrangeTesting00/orange-testing/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/orangetesting.svg" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/orangetesting">
    <img src="https://img.shields.io/npm/v/orangetesting.svg" alt="Version">
  </a>
</p>

<h2 align="center">Orange Testing CLI</h2>

# Como configurar os agendamentos na Pipeline (CI/CD)

## Requisitos para utilização da biblioteca:
- Node.js - versão 14.19.0 ou superior;
- Usuário cadastrado na plataforma Orange Testing.

<br />

## Passo-a-passo para a configuração da biblioteca:
#### 1. Instale o pacote como dependência de desenvolvimento:
```
npm install orangetesting -D
```

#### 2. Crie um arquivo JSON de configuração com a instância e os dados do agendamento:
```
{
  "instance": "instancia",
  "scheduleBody": {
    "name": "Agendamento 01",
    "product": "Produto",
    "url": "https://url",
    "identifiers": ["testcase-01"]
  }
}
```

#### 3. No arquivo "package.json", crie um script que executa o comando "orangetesting" e informe o caminho relativo do arquivo de configuração criado na etapa anterior, usuário e senha:
```
"scripts": {
	"schedule": "orangetesting ./arquivos/config.json usuario senha"
},
```
##### Obs.: É recomendável a utilização de variáveis de ambiente para não expor suas credenciais.

<br />

## Parâmetros do agendamento
### Parâmetros obrigatórios:

```
{
  "instance": Instância onde o agendamento será criado e executado,
  "scheduleBody": Parâmetros do agendamento
}
```

### Parâmetros obrigatórios do agendamento:

```
{
  "name": Nome do Agendamento.
  "product": Nome do Produto que contém os Módulos a serem executados.
  "url": URL do Agendamento.
```
**Ao menos um dos arrays abaixo precisa conter informação**
```
  "identifiers": Array com identificadores dos Casos de Teste.
  "modules": Array com módulos a serem executados.
  "qualityGates": Array dos Padrões de Qualidade a serem executados. Esse parâmetro é opcional, podendo ser utilizado no lugar do array modules para executar todos os testes dentro dos padrões de qualidade informados.
}
```

### Parâmetros do objeto scheduleBody
```
"scheduleBody": {
  "modules": Array com os nomes dos Módulos a serem executados.
  "robots": Array com os nomes dos robôs que devem ser executados.
  "variables": informe o nome e os valores das variáveis que devem ser preenchidas no momento da execução.
  "qualityGates": Array dos Padrões de Qualidade a serem executados. Esse parâmetro é opcional, podendo ser utilizado no lugar do array modules para executar todos os testes dentro dos padrões de qualidade informados.
  "browsers": Array com os browsers onde os testes devem ser executados, caso não seja informado o teste será executado no Google Chrome.
  "identifiers": identificadores do caso de teste.
  "Scheduled": horário de execução do agendamento.
  "Mobile": Array de objetos com informações dos dispositivos que será executado.
  "EmailNotifications": Array de objetos com lista dos emails que devem receber notificação e frequência(sempre ou apenas nas falhas).
  "SlackNotifications": Array de objetos com lista dos canais que devem receber notificação e frequência(sempre ou apenas nas falhas).
  "TeamsNotifications": Array de objetos com lista dos ids dos canais que devem receber notificação e frequência(sempre ou apenas nas falhas).
}
```

**Obs.: Para notificações, somente são permitidos canais e e-mails cadastrados no sistema.**

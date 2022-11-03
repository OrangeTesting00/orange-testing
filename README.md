# Como configurar os agendamento na Pipeline (CI/CD)
Para utilizar o pacote é necessário informar dados do agendamento que será executado.

##### 1. Os dados necessários devem ser passados via arquivo JSON de acordo com a estrutura abaixo:

###### Parâmetros obrigatórios:
```
{
    "instance": Instância o agendamento será criado e executado,
    "login": {
        "password": Senha do usuário,
        "username": Username do usuário
    },
    "scheduleBody": Parâmetros do agendamento
}
```

###### Parâmetros obrigatórios do agendamento:
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


###### Parâmetros do scheduleBody
```
  "scheduleBody": {
        "modules": Array com os nomes dos Módulos a serem executados.
        "robots": Array com os nomes dos robôs que devem ser executados
        "variables": informe o nome e os valores das variáveis que devem ser preenchidas no momento da execução
        "qualityGates": Array dos Padrões de Qualidade a serem executados. Esse parâmetro é opcional, podendo ser utilizado no lugar do array modules para executar todos os testes dentro dos padrões de qualidade informados.
        "browsers": Array com os browsers onde os testes devem ser executados, caso não seja informado o teste será executado no Google Chrome.
        "identifiers": identificadores do caso de teste
        Scheduled: horário de execução do agendamento 
        Mobile: Array de objetos com informações dos dispositivos que será executado
        EmailNotifications:   Array de objetos com lista dos  emails que devem receber notificação e frequência(sempre ou apenas nas falhas) * será permitido apenas emails cadastrados no sistema *
        SlackNotifications: Array de objetos com lista dos canais que devem receber notificação e frequência(sempre ou apenas nas falhas) * será  permitido apenas canais cadastrados no sistema *
        TeamsNotifications: Array de objetos com lista dos ids dos canais que devem receber notificação e frequência(sempre ou apenas nas falhas) * será  permitido apenas id de canais cadastrados no sistema *
    }
```

# Como configurar os agendamento na Pipeline (CI/CD)
Para utilizar o pacote é necessário informar dados do agendamento que será executado.

##### 1. Os dados necessários devem ser passados via arquivo JSON de acordo com a estrutura abaixo:

```
{ 
  "instance": Instância o agendamento será criado e executado,
  "login": {
    "password": Senha do usuário,
    "username": Username do usuário
  },
  "scheduleBody": {
    "name": Nome do Agendamento.
    "url": URL do Agendamento.
    "product": Nome do Produto que contém os Módulos a serem executados.
    "browsers": Array com os browsers onde os testes devem ser executados. Esse parâmetro é opcional, caso não seja informado, o teste será executado no Google Chrome.
    "modules": Array com os nomes dos Módulos a serem executados. 
    "robots": Array com os nomes dos robôs que devem ser executados. 
    "variables": Informe o nome e os valores das variáveis que devem ser preenchidas no momento da execução  
    "qualityGates": Array dos Padrões de Qualidade a serem executados. Esse parâmetro é opcional, podendo ser utilizado no lugar do array modules para executar todos os testes dentro dos padrões de qualidade informados. Exemplos: Happy path; 
    "EmailNotifications": Array com frequência e e-mails que deseja receber as notificações. Esse parâmetro é opcional, caso não seja informado, o usuário não receberá notificações.
        "frequency": Parâmetro para definir a frequência desejada. Utiliza-se "ExecutionFailed" para a opção Quando Falhar e "Always" para a opção Sempre.
        "notify": Array com os e-mails que receberão as notificações via e-mail.
    "SlackNotifications": Array com frequência e canal do Slack que deseja receber as notificações. Esse parâmetro é opcional, caso não seja informado, o usuário não receberá notificações.
        "frequency": Parâmetro para definir a frequência desejada. Utiliza-se "ExecutionFailed" para a opção Quando Falhar e "Always" para a opção Sempre.
        "notify": Array com os canais que receberão as notificações via Slack.
    "TeamsNotifications": Array com frequência e ID do canal do Teams que deseja receber as notificações. Esse parâmetro é opcional, caso não seja informado, o usuário não receberá notificações.
        "frequency": Parâmetro para definir a frequência desejada. Utiliza-se "ExecutionFailed" para a opção Quando Falhar e "Always" para a opção Sempre.
        "notify": Array com os ID's dos canais que receberão as notificações via Teams.
    "mobile": Array com as configurações relacionadas ao aplicativo e dispositivo desejado para executar os testes.
        "ApplicationName": Nome do aplicativo desejado.
        "ApplicationVersion": Versão do aplicativo desejado.
        "Devices": Array com os dispositivos escolhidos para a execução do teste.
        "DeviceName": Nome do dispositivo desejado.
        "DeviceVersion": Versão do dispositivo desejado.
    "Scheduled": Data e hora em que deseja que o agendamento seja executado.
    }
```

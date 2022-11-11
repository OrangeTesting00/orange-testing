#!/usr/bin/env node

import fs from 'fs';
import meow from 'meow';

import delay from '../utils/delay.js';
import generateToken from './generateToken.js';
import getScheduleResult from './getScheduleResult.js';
import postSchedule from './postSchedule.js';

const cliHelpText = `
  Uso
    $ orangetesting <argumentos>

  Opções
    --help  Manual de uso da linha de comando
    --token, --t  Token de autenticação (login)
    --username, --usr  Usuário para login
    --password, --ps  Senha para login
    --path, --p  Caminho do arquivo de configuração (caminho padrão = ./ot-config.json)
    --url  URL onde o agendamento será executado

  Exemplos
    $ orangetesting --path ./arquivos/config --token tokenDeAcesso
    $ orangetesting --t tokenDeAcesso
    $ orangetesting --t tokenDeAcesso --url https://
    $ orangetesting --username usuario --password *****

  Observação
    Para realizar a autenticação do usuário, apenas é necessário informar o token ou os dados de acesso.
    Caso todos os possíveis dados de autenticação sejam informados, usuário e senha serão ignorados.

    Se a URL não for informada, será utilizada a URL no arquivo de configuração.
`;

const cliOptions = {
  importMeta: import.meta,
  flags: {
    token: {
      type: "string",
      alias: "t",
      default: ""
    },
    path: {
      type: "string",
      alias: "p",
      default: "./ot-config.json",
    },
    username: {
      type: "string",
      alias: "usr",
    },
    password: {
      type: "string",
      alias: "ps",
    },
    url: {
      type: "string",
      default: ""
    }
  }
}

const args = meow(cliHelpText, cliOptions);

async function getParamsFromFile(cliFlags) {
  const encoding = 'utf-8';
  const path = cliFlags.path;

  try {
    if (path === undefined) {
      throw new Error("ENOPATH");
    }

    const data = JSON.parse(fs.readFileSync(path, encoding));

    main(data, cliFlags);
  } catch (error) {
    if (error.message === "ENOPATH") {
      console.log("Caminho do arquivo com os dados do agendamento não informado.");
    }

    if (error.code === "ENOENT") {
      console.log("Arquivo não encontrado.");
    }

    if (error.code === "EISDIR") {
      console.log("Caminho informado não é um arquivo.");
    }

    process.exit(1);
  }
}

async function main(params, args) {
  const loginObj = {
    username: args.username,
    password: args.password
  };

  const loginUser = await generateToken(params.instance, loginObj, args.token);

  if (!loginUser.ok) {
    console.log(loginUser.message);
    process.exitCode = 1;

    return;
  }

  if (args.token === "") {
    console.log(`1/4 - ${loginUser.message}`);
  } else {
    console.log("1/4 - Token de acesso fornecido, realizando agendamento...")
  }

  const postScheduleResponse = await postSchedule(loginUser.token, params.scheduleBody, params.instance, args.url);
  if (!postScheduleResponse.ok) {
    console.log(postScheduleResponse.message);
    process.exitCode = 1;

    return;
  }

  let getScheduleResultCurrent = {};

  let scheduleIsRunning = true;
  let firstLoop = true;
  while (scheduleIsRunning) {
    if (firstLoop) {
      await delay(2000);
      firstLoop = false;
    } else {
      await delay(10000);
    }

    getScheduleResultCurrent = await getScheduleResult(loginUser.token, postScheduleResponse.idSchedule, params.instance);

    if (getScheduleResultCurrent.scheduleFinished) {
      scheduleIsRunning = false;
    } else {
      console.log("3/4 - Agendamento em execução...")
    }
  }

  if (getScheduleResultCurrent.result !== 'Pass') {
    console.log("4/4 - Agendamento concluído com falha.");
    console.log(`Link para o relatório consolidado: \
https://${params.instance}.orangetesting.com/schedules/${getScheduleResultCurrent.idSchedule}/consolidated`);
    process.exitCode = 1;

    return;
  }

  console.log("4/4 - Agendamento concluído com sucesso.");
  console.log(`Link para o relatório consolidado: \
https://${params.instance}.orangetesting.com/schedules/${getScheduleResultCurrent.idSchedule}/consolidated`);

  process.exitCode = 0;

  return;
}

getParamsFromFile(args.flags);

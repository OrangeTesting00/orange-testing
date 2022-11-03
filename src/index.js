import fs from 'fs';

import delay from '../utils/delay.js';
import generateToken from './generateToken.js';
import getScheduleResult from './getScheduleResult.js';
import postSchedule from './postSchedule.js';

const path = process.argv[2];

async function getParamsFromFile(filePath) {
  const encoding = 'utf-8';

  try {
    if (filePath === undefined) {
      throw new Error("ENOPATH");
    }

    const data = JSON.parse(fs.readFileSync(filePath, encoding));

    main(data);
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

async function main(params) {
  const loginUser = await generateToken(params.instance, params.login);
  if (!loginUser.ok) {
    console.log(loginUser.message);
    process.exitCode = 1;

    return;
  }

  const postScheduleResponse = await postSchedule(loginUser.token, params.scheduleBody, params.instance);
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

  console.log("4/4 - Agendamento concluído com sucesso. \n", JSON.stringify(getScheduleResultCurrent));
  process.exitCode = 0;

  return;
}

getParamsFromFile(path);
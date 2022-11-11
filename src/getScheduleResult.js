import fetchCommon, { parseToken } from "../utils/fetchCommon.js";

async function getScheduleResult(token, idSchedule, instance) {
  const requestData = {
    url: `https://${instance}.orangetesting.com:5001/api/schedules/${idSchedule}/result`,
    headers: parseToken(token)
  }

  return await fetchCommon(requestData)
    .then(async (response) => {
      const resultResponse = {
        status: response.status,
        ok: response.ok,
        message: response.statusText,
        scheduleFinished: false,
      };

      if (response.ok) {
        const { start, end, result, idSchedule, ...rest } = await response.json();

        resultResponse.result = result;
        resultResponse.idSchedule = idSchedule;
        resultResponse.rest = rest;

        if (result !== "Pending" && result !== "Running") {
          resultResponse.scheduleFinished = true;
        }
      }

      if (response.status === 418) {
        resultResponse.message = "Error";
      }

      return resultResponse;
    })
    .catch((_) => {
      console.log("Falha ao checar status do agendamento.");
      process.exitCode = 1;
    });
}

export default getScheduleResult; 
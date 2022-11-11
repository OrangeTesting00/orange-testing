import fetchCommon, { parseToken } from "../utils/fetchCommon.js";

async function postSchedule(token, body, instance, url = "") {
  const bodyIsEmpty = body ? Object.keys(body).length === 0 : true;

  try {
    if (!instance) {
      throw new Error('Instância não informada.')
    }

    if (!body || bodyIsEmpty) {
      throw new Error('Falha ao efetuar agendamento. Confira os dados da propriedade "scheduleBody" e tente novamente.');
    }

    if (url !== "") {
      body.url = url;
    }

    const requestData = {
      url: `https://${instance}.orangetesting.com:5001/api/schedules `,
      method: 'POST',
      body: JSON.stringify(body),
      headers: parseToken(token)
    };

    return await fetchCommon(requestData)
      .then(async (response) => {
        const result = {
          ok: response.ok,
          status: response.status,
          message: response.statusText
        };

        if (response.ok) {
          const { idSchedule } = await response.json();
          result.message = "2/4 - Agendamento realizado com sucesso.";
          result.idSchedule = idSchedule;

          console.log(result.message);
        }

        if (response.status === 400) {
          result.message = 'Falha ao efetuar agendamento. Confira os dados da propriedade "scheduleBody" e tente novamente.';
        }

        if (response.status === 401) {
          result.message = 'Falha ao efetuar agendamento. O token fornecido não é válido.';
        }

        return result;
      })
      .catch((_) => {
        console.log("Falha ao realizar agendamento.");

        process.exit(1);
      });
  } catch (error) {
    const result = {
      ok: false,
      message: error.message
    };

    return result;
  }
}

export default postSchedule; 
import fetchCommon from "../utils/fetchCommon.js";

async function generateToken(instance, body) {
  const noLoginData = body ? Object.keys(body).length === 0 : true;

  try {
    if (!instance) {
      throw new Error('Instância não informada.')
    }

    if (!body || noLoginData || !body.username || !body.password) {
      throw new Error('Falha ao efetuar o login. Dados de login incompletos.');
    }

    const requestData = {
      url: `https://${instance}.orangetesting.com:5001/api/users/login`,
      method: 'POST',
      body: JSON.stringify(body),
    };

    return await fetchCommon(requestData)
      .then(async (response) => {
        const result = {
          status: response.status,
          ok: response.ok,
          message: response.statusText
        };

        if (response.ok) {
          const { token } = await response.json();

          result.message = "Login efetuado com sucesso.";
          result.token = token;
        }

        if (response.status === 401) {
          result.message = "Falha ao efetuar o login. Confira os valores inseridos na instância, suas credenciais e tente novamente.";
        }

        if (response.status === 418) {
          result.message = "You've reached the max number of attempts allowed. Please wait 15 minutes";
        }

        return result;
      })
      .catch((_) => {
        console.log("Falha ao efetuar o login");
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

export default generateToken; 
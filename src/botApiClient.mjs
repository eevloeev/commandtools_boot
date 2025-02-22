import config from "#config.mjs"
import { log } from "#logger.mjs"

const sendRequest = async (method, body) => {
  log(`Request: ${method}`);
  
  const url = new URL(`https://api.telegram.org/bot${config.botToken}/${method}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null
    });
    const data = await response.json();
    
    if (!data.ok) {
      return {
        error: true,
        data,
      };
    }
    
    return {
      error: null,
      data,
    };
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};

export const request = async (method, body = null) => {
  const response = await sendRequest(method, body);

  log(`Response: ${method}`);

  return response;
};

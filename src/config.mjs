if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is required');
}

if (!process.env.ALLOWED_USERS) {
  throw new Error('ALLOWED_USERS is required');
}

const config = {
  botToken: process.env.BOT_TOKEN,
  allowedUsers: process.env.ALLOWED_USERS.split(',').map(userId => parseInt(userId, 10)),
};

export default config;
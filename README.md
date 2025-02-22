# Command Tools Bot

A bot for managing chats, retrieving IDs, and performing various tasks in Telegram.

You can find this bot on Telegram: [@commandtools_bot](https://t.me/commandtools_bot).

Stack: Vanilla JavaScript, ES Modules, Node.js, zero dependencies.

## Usage

Deploy the bot as a Docker container with following environment variables:

- `BOT_TOKEN` - Telegram bot token
- `ALLOWED_USERS` - comma-separated list of user IDs that are allowed to send commands to the bot

For example, you can use ready-made Docker image [eevloeev/commandtools_bot](https://hub.docker.com/r/eevloeev/commandtools_bot) from Docker Hub for quick deployment:

```bash
docker run -d --name commandtools_bot --restart unless-stopped \
  -e BOT_TOKEN='YOUR_TOKEN' \
  -e ALLOWED_USERS='YOUR_USERS' \
  eevloeev/commandtools_bot
```

## Support

If you like this project, you can support it by starring 🌟.

If you have any questions, feel free to contact me on Telegram: [@eevloeev](https://t.me/eevloeev).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

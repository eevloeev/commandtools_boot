import config from '#config.mjs';
import { request } from '#botApiClient.mjs';

let offset = 0;
while (true) {
  const response = await request('getUpdates', {
    offset,
    limit: 100,
    timeout: 60, // 1 minute
    allowed_updates: ['message'],
  });

  for (const update of response.data.result) {
    if (
      'message' in update
      && config.allowedUsers.includes(update.message.from.id)
      && 'entities' in update.message
    ) {
      for (const entity of update.message.entities) {
        if (entity.type === 'bot_command') {
          const command = update.message.text.slice(entity.offset, entity.offset + entity.length);
          
          switch (command) {
            case '/getchatid':
              await request('sendMessage', {
                chat_id: update.message.chat.id,
                text: `Chat ID: \`${update.message.chat.id}\``,
                parse_mode: 'MarkdownV2',
                reply_markup: {
                  inline_keyboard: [
                    [{ text: 'Copy ID', copy_text: { text: update.message.chat.id } }]
                  ]
                }
              });
              break;
          }
        }
      }
    }
    offset = Math.max(offset, update.update_id + 1);
  }
};
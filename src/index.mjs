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
          // Get the command without the bot username
          const command = update.message.text.slice(entity.offset, entity.offset + entity.length).split('@')[0];
          
          switch (command) {
            case '/getChatId':
              await request('sendMessage', {
                chat_id: update.message.chat.id,
                text: `Chat ID: \`${update.message.chat.id}\``,
                parse_mode: 'MarkdownV2',
                reply_to_message_id: update.message.message_id,
                reply_markup: {
                  inline_keyboard: [
                    [{ text: 'Copy ID', copy_text: { text: update.message.chat.id } }]
                  ]
                }
              });
              break;
            case '/getRawData':              
              const formattedData = `\`\`\`json\n${JSON.stringify(update, null, 2)}\n\`\`\``;
              
              await request('sendMessage', {
                chat_id: update.message.chat.id,
                text: formattedData,
                parse_mode: 'MarkdownV2',
                reply_to_message_id: update.message.message_id
              });
              break;
          }
        }
      }
    }
    offset = Math.max(offset, update.update_id + 1);
  }
};
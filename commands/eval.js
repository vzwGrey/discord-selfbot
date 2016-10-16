const now = require('performance-now');

module.exports = {
  help: {
    name: 'eval',
    desc: 'Runs a JavaScript snippet',
    usage: '<js snippet>',
    aliases: ['e']
  },

  exec: (client, msg, params) => {
    let time = now();
    let input = params.join(' ');

    try {
      let message = msg, self = client, bot = client;
      let output = eval(input.replace(/\r?\n|\r/g, ' '));

      if(typeof output != 'string') {
        output = require('util').inspect(output);
      }

      output = output.replace(client.token, '[token redacted]').replace(client.user.email, '[email redacted]');

      msg.edit(`***\`Input\`*** \`\`\`js\n${input}\n\`\`\`\n***\`Output\`*** \`\`\`js\n${output}\n\`\`\``).catch(console.error);

    } catch (error) {
      msg.edit(`***\`Input\`*** \`\`\`js\n${input}\n\`\`\`\n***\`Error\`*** \`\`\`js\n${error}\n\`\`\``).catch(console.error);
    }
  }
}
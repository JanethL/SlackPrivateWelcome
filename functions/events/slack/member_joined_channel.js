const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Slack member_joined_channel event
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {

  // Store API Responses
  const result = {slack: {}};

  console.log(`Running [Slack → Retrieve Channel, DM, or Group DM by id]...`);
  result.slack.channel = await lib.slack.conversations['@0.2.5'].info({
    id: `${event.event.channel}`
  });

  console.log(`Running [Slack → Retrieve a User]...`);
  result.slack.user = await lib.slack.users['@0.3.32'].retrieve({
    user: `${event.event.user}`
  });

  
  console.log(`Running [Slack → Create a new Ephemeral Message from your Bot]...`);
  result.slack.response = await lib.slack.messages['@0.5.11'].ephemeral.create({
    channelId: `${event.event.channel}`,
    userId: `${event.event.user}`,
    text: `👋 Hello ${result.slack.user.name} ! Welcome to our #${result.slack.channel.name} channel. `,
    attachments: [],
    blocks: [],
    as_user: false
  });
  

  return result;

};
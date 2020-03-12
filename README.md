# README
[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

# 👋 Greet New Members Privately in Slack 

In just a few steps, we will create a Slack app to privately welcome and guide new users when they join a Slack channel. We’ll breeze through the setup process, and you’ll be able to return to make modifications and add your own style and custom message for a unique onboarding experience!

<img src="https://cdn-images-1.medium.com/max/1280/1*mvvAvsgBv-vd2kik89moiQ.png" width="250">

The workflow will run on [Standard Library](https://stdlib.com), a
free-to-use API and workflow hosting platform, **powered by Node.js**, that will
use this repository as its project structure. Standard Library will automatically
handle Slack authentication / webhook signing and more for you, so you can
focus on just writing and modifying logic.

# Example Use Case

👋 Welcome new members and set expectations 

🧙 Highlight key people, resources, events

⚡️  Foster an engaged and active community

🗂 Maintain an organized workspace

🎨 Customize your messages with block kit builder

<img src="https://cdn-images-1.medium.com/max/1280/1*JOkQda_I7vTbgnExD6sbjA.png" width="400">

 
# Table of Contents

1. [How It Works](#how-it-works)
1. [Installation](#installation)
1. [Test Your Workflow](#test-your-workflow)
1. [Making Changes](#making-changes)
   1. [via Web Browser](#via-web-browser)
   1. [via Command Line](#via-command-line)
1. [Support](#support)
1. [Acknowledgements](#acknowledgements)

# How It Works

```
1  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

3   /**
4   * An HTTP endpoint that acts as a webhook for Slack member_joined_channel event
5   * @param {object} event
6   * @returns {object} result Your return value
7   */
8   module.exports = async (event) => {

10   // Store API Responses
11   const result = {slack: {}};

13  console.log(`Running [Slack → Retrieve Channel, DM, or Group DM by id]...`);
14  result.slack.channel = await lib.slack.conversations['@0.2.5'].info({
15    id: `${event.event.channel}`
16  });

18  console.log(`Running [Slack → Retrieve a User]...`);
19  result.slack.user = await lib.slack.users['@0.3.32'].retrieve({
20   user: `${event.event.user}`
21  });

  
24  console.log(`Running [Slack → Create a new Ephemeral Message from your Bot]...`);
25  result.slack.response = await lib.slack.messages['@0.5.11'].ephemeral.create({
26    channelId: `${event.event.channel}`,
27    userId: `${event.event.user}`,
28    text: `👋 Hello ${result.slack.user.name} ! Welcome to our #${result.slack.channel.name} channel. `,
29    attachments: [],
30    blocks: [],
31    as_user: false
32  });
  

35  return result;

37};
```
The first line of code imports an [NPM](https://www.npmjs.com/package/lib) package called “lib” to allow us to communicate with other APIs on top of Standard Library:

`const lib = require(‘lib’)({token: process.env.STDLIB_SECRET_TOKEN});`

Line 3–7 is a comment that serves as documentation and allows Standard Library to type check calls to our functions. If a call does not supply a parameter with a correct (or expected type) it would return an error.

Line 8 is a function (`module.exports`) that will export our entire code found in lines 8–37. Once we deploy our code, this function will be wrapped into an HTTP endpoint (API endpoint) and it’ll automatically register with Slack so that every time a `member_joined_channel` event happens, Slack will send the event payload for our API endpoint to consume.

Lines 24–32 creates and posts your message using the information (parameters) that are passed in: `channelId`, `UserId`, `Text`.

You can read more about API specifications and parameters [here](https://docs.stdlib.com/connector-apis/building-an-api/api-specification/)

# Installation

**Click Open in Autocode👇🏼**

[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

You will be prompted to sign in or create a free account. If you have a Standard Library account click **Already Registered** and sign in using your Standard Library credentials.

**Link a Slack Account & Deploy your Workflow**

Before we can deploy our code live, we need to link Select the **1 Account Required** red button which will prompt you to link a Slack account.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e66888926bbef43d9481dd7_1_tgu46HauPHWliIeDa3-Xug.png" width="400">

Select **Link Resource** from the Identity Management Screen

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e668894f63b77035852ba49_1_dq_mT36YIoIFRvRwvnZhFg.png" width="400">

If you’ve built Slack apps with Standard Library, you’ll see existing Slack accounts, or you can select **Link New Resource** to link a new Slack app.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6688a2418eee2b1d3245a0_0__DwyDOC6YWDav03M.png" width="400">
Select **Install Standard Library App.**
<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6688abe5e3898706593578_0_8PmM4BiMvkmKG1Oi.png" width="400">
You should see an OAuth popup that looks like this:

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6688b4e5e3894d7659359e_0_I4y2dU7RLUhrGcxQ.png" width="400">
Select **Allow**. You’ll have the option to customize your Slack app with a name and image.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6688be462bf016a2c36b03_1_kpbfG0cHjXUoSTfRAzOPlA.png" width="400">
Select **Finish**. The green checkmarks confirm that you’ve linked your accounts correctly. Click **Finished Linking.**

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6688cd26bbef80e2481ed9_1_6Z00pwSEfq0pUsAR2HG33A.png" width="400">
Select the orange **Save Endpoint** button.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e668900e5e38939015936a9_1_SydeSnmMkbFMrpI8MB3JSA.png" width="400">

Give your project a name and **Save API Project**.

Great! You’ve just saved your first project. Autocode automatically sets up a project scaffold to save your project as an API endpoint, but it hasn’t been deployed.

This means your endpoints are not yet live and can’t respond to HTTP requests or events. To deploy your API to the cloud select **Deploy API** in the bottom-left of the file manager.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e66891104c8aa5723a283ba_1_DJsbBEuMOuZpbNumi9bZlg.png" width="400">

# Test Your Workflow

Test your Slack app by joining or leaving any channel in your workspace. If you’ve set everything up properly you should receive a warm welcome from your Slack app.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6687c804c8aa12f6a27dd1_1_mvvAvsgBv-vd2kik89moiQ.png" width="400">


# Making Changes

There are two ways to modify your application. The first is via our in-browser
editor, [Autocode](https://Autocode.stdlib.com/). The second is
via the [Standard Library CLI](https://github.com/stdlib/lib).

## via Web Browser

Simply visit [`autocode.stdlib.com`](https://autocode.stdlib.com) and select `dev live API` for your project. 

<img src= "https://cdn-images-1.medium.com/max/1280/1*kg579TkccVIhMCtrvO_LSw.png" width="400">


You can use Block Kit Builder to create a rich and interactive message design in no time. 

[Block Kit Builder](https://api.slack.com/block-kit) is Slack’s visual prototyping tool that enables Makers to create rich and interactive message designs without having to write code. Makers can choose from pre-built templates and edit the code or use building components. Once a design is ready, copy and paste the JSON into the blocks section of your project on Autocode.

Access my template design by clicking this [link](https://api.slack.com/tools/block-kit-builder?mode=message&blocks=%5B%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*%F0%9F%99%8F%F0%9F%8F%BD%20Thank%20you%20for%20joining%20our%20community%20of%20Makers%20and%20Developers.%20%5Cn%20%5Cn%20%F0%9F%98%8D%20%20It%27d%20be%20awesome%20if%20you%20could%20introduce%20yourself%20in%20our%20%23general%20channel.%5Cn%20%20%5Cn%20Tell%20us%20who%20you%20are%20and%20what%20projects%20you%20are%20working%20on.%20Also%20feel%20free%20to%20ask%20any%20question%20regarding%20building%20with%20APIs%20on%20Standard%20Library.%20%5Cn%20%5CnOnce%20you%20are%20done%20telling%20us%20about%20yourself%20you%20may%20return%20and%20check%20out%20tutorials%2C%20blog%20posts%2C%20and%20upcoming%20events.%20%5Cn%20%5Cn%20Happy%20Building!%20%F0%9F%A4%97%20%F0%9F%91%B7%20%F0%9F%9A%80%20%20%22%7D%7D%2C%7B%22type%22%3A%22divider%22%7D%2C%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22%20%F0%9F%91%A8%F0%9F%8F%BD%F0%9F%92%BB%20*Tutorials*%20%20%22%7D%7D%2C%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Introducing%20Autocode*%20%5Cn%20Watch%20this%2010%20minute%20video%20to%20learn%20how%20easy%20it%20is%20to%20build%20integrations%20with%20APIs%20on%20Standard%20Library%22%7D%2C%22accessory%22%3A%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Watch%20Now%22%2C%22emoji%22%3Atrue%7D%2C%22url%22%3A%22https%3A%2F%2Fyoutu.be%2Fha3C0X3Vyi0%22%7D%7D%2C%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*APIs%20for%20Makers*%20%5Cn%20A%20high-level%20overview%20of%20how%20APIs%20work%20and%20a%20step%20by%20step%20example%20of%20how%20to%20connect%20two%20different%20pieces%20of%20software%3A%20Slack%20and%20Typeform%22%7D%2C%22accessory%22%3A%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Read%20Now%22%2C%22emoji%22%3Atrue%7D%2C%22url%22%3A%22https%3A%2F%2Fmedium.com%2Fbetter-programming%2Fapis-for-makers-9670719e7f25%22%7D%7D%2C%7B%22type%22%3A%22divider%22%7D%2C%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22%3Acalendar%3A%20%7C%20%20%20*UPCOMING%20EVENTS*%20%20%7C%20%3Acalendar%3A%20%22%7D%7D%2C%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22%6003%2F20%60%20*Slack%20app%20%2B%20API%20%20Workshop%20for%20Makers%20%26%20Developers*%20_%20Maker.dev%20(SF%20Chapter)%20%40%20SlackHQ%205%3A30%20pm%20-%208%3A30%20pm_%22%7D%2C%22accessory%22%3A%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22RSVP%22%2C%22emoji%22%3Atrue%7D%2C%22url%22%3A%22https%3A%2F%2Fwww.meetup.com%2FMaker-dev-SF-Chapter%2Fmembers%2F%3Fsort%3Djoin_date%26desc%3Dtrue%22%7D%7D%2C%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22%6003%2F20%60%20*No%20Code%20March*%20_%20Learn%20how%20to%20build%20with%20Autocode%2C%20Bubble%2C%20Airtable%20%2B%20more%20%40%20Galvanize%206%3A00%20pm%20-%208%3A00%20pm_%22%7D%2C%22accessory%22%3A%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22RSVP%22%2C%22emoji%22%3Atrue%7D%2C%22url%22%3A%22https%3A%2F%2Fwww.eventbrite.com%2Fe%2Fno-code-sf-meetup-tickets-97328910391%22%7D%7D%5D) You should see a template that looks like this:

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e66892de5e3894891593853_1_m_xtAP2fRWza10nz4p5X1g.png" width="400">

Select and copy only the objects inside the brackets [].

Set the objects as the value for theblocks key by pasting the code directly onto Autocode’s interface as I have done below:

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e66893b8ca145d2caface89_1__FXLdcfVmvnB4Fqa3mzuOw.png" width="400">

Select **Save Endpoint** and **Deploy buttons** to push your changes live 🚀

When you test your app you should see the updated welcome message.

You can easily make updates and changes this way, and deploy directly from your browser.

## via Command Line

You can install the CLI tools from [stdlib/lib](https://github.com/stdlib/lib) to test,
makes changes, and deploy.

You can retrieve your package via `lib get`

```shell
lib get <username>/<project-name>@dev
```

To deploy

```shell
# Deploy to dev environment
lib up dev
```

# Shipping to Production

Standard Library has easy dev / prod environment management, if you'd like to ship to production,
visit your dashboard on [`https://build.stdlib.com/`](https://build.stdlib.com/),
find your project and select it.

<img src= "https://cdn-images-1.medium.com/max/1280/1*cr32Ad3q1mKrWiejjxTsZQ.png" width="400">

From the environment management screen, simply click **Ship Release**.

<img src="https://cdn-images-1.medium.com/max/1440/1*JqiwC6a_zbIdTsww1BOYLQ.png" width="400">

Link any necessary resources, specify the version of the release and click **Create Release** to proceed. 

That's all you need to do!

# Support

Via Slack: [`libdev.slack.com`](https://libdev.slack.com/)

You can request an invitation by clicking `Community > Slack` in the top bar
on [`https://stdlib.com`](https://stdlib.com).

Via Twitter: [@StandardLibrary](https://twitter.com/StandardLibrary)

Via E-mail: [support@stdlib.com](mailto:support@stdlib.com)

# Acknowledgements

Thanks to the Standard Library team and community for all the support!

Keep up to date with platform changes on our [Blog](https://stdlib.com/blog).

Happy hacking!

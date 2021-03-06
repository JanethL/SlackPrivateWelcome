# README
[<img src="https://deploy.stdlib.com/static/images/deploy.svg?" width="192">](https://deploy.stdlib.com/)

# 👋 A Slack App to Greet and Guide New Members to a Channel

In just a few steps, we will create a Slack app to privately welcome and guide new users when they join a Slack channel. After you deploy the code, you’ll be able to return to make modifications and add your own style and custom message for a unique  onboarding experience.

<img src= "./readme/WelcomeApp10.png" width="400">

The Slack app will run on [Standard Library](https://stdlib.com), a
free-to-use API and workflow hosting platform, **powered by Node.js**, that will
use this repository as its project structure. Standard Library will automatically
handle Slack API authentication/webhook signing and more for you, so you can
focus on writing and modifying logic.

# Use Case

👋 Welcome and guide new members in a channel

📏 Set channel expectations

👉🏼 Highlight key people and resources

📅 Share upcoming events and due dates

💬Foster an active and engaged community


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
``` Javascript
1  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

3  /**
4  * An HTTP endpoint that acts as a webhook for Slack member_joined_channel event
5  * @param {object} event
6  * @returns {object} result Your return value
7  */
8 module.exports = async (event) => {

10   // Store API Responses
11  const result = {slack: {}};

13  console.log(`Running [Slack → Retrieve Channel, DM, or Group DM by id]...`);
14  result.slack.channel = await lib.slack.conversations['@0.2.5'].info({
15  id: `${event.event.channel}`
16  });

18  console.log(`Running [Slack → Retrieve a User]...`);
19  result.slack.user = await lib.slack.users['@0.3.32'].retrieve({
20    user: `${event.event.user}`
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

37 };
```
The first line of code imports an [NPM](https://www.npmjs.com/package/lib) package called “lib” to allow us to communicate with other APIs on top of Standard Library:

`const lib = require(‘lib’)({token: process.env.STDLIB_SECRET_TOKEN});` 

Line 3–7 is a comment that serves as documentation and allows Standard Library to type check calls to our functions. If a call does not supply a parameter with a correct (or expected type) it would return an error.

Line `8` is a function (module.exports) that will export our entire code found in lines 8–37. Once we deploy our code, this function will be wrapped into an HTTP endpoint (API endpoint) and it’ll automatically register with Slack so that every time a member_joined_channel event happens, Slack will send the event payload for our API endpoint to consume.

Lines `24–32` creates and posts your message using the information (parameters) that are passed in: channelId, UserId, Text.

You can read more about API specifications and parameters here: https://docs.stdlib.com/connector-apis/building-an-api/api-specification/

# Installation

Before we can deploy our code live, we need to Select the 1 Account Required red button which will prompt you to link a Slack account.

<img src= "./readme/WelcomeApp1.png" width="400">


Select **Link Resource** from the Identity Management Screen

<img src= "./readme/WelcomeApp2.png" width="400">

If you’ve built Slack apps with Standard Library, you’ll see existing Slack accounts, or you can select **Link New Resource** to link a new Slack app.

<img src= "./readme/WelcomeApp3.png" width="400">

Select **Install Standard Library App**.

<img src= "./readme/WelcomeApp4.png" width="400">

You should see an OAuth popup that looks like this:

<img src= "./readme/WelcomeApp5.png" width="400">

Select **Allow**. You’ll have the option to customize your Slack app with a name and image.

<img src= "./readme/WelcomeApp6.png" width="400">

Select **Finish**. The green checkmarks confirm that you’ve linked your accounts correctly. Click **Finished Linking.**

<img src= "./readme/WelcomeApp7.png" width="400">

Select the orange **Save Endpoint** button.

<img src= "./readme/WelcomeApp8.png" width="400">

Give your project a name and **Save API Project**.

Great! You’ve just saved your first project. Autocode automatically sets up a project scaffold to save your project as an API endpoint, but it hasn’t been deployed.

This means your endpoints are not yet live and can’t respond to HTTP requests or events. To deploy your API to the cloud select **Deploy API** in the bottom-left of the file manager.

<img src= "./readme/WelcomeApp9.png" width="400">

🚀 **Congrats! Your App is Live** 

# Test Your Workflow

Test your Slack app by joining or leaving any channel in your workspace. If you’ve set everything up properly you should receive a warm welcome from your Slack app.

<img src= "./readme/WelcomeApp10.png" width="400">

# Making Changes

There are two ways to modify your application. The first is via our in-browser
editor, [Autocode](https://autocode.com/). The second is
via the [Standard Library CLI](https://github.com/stdlib/lib).

## via Web Browser

Simply visit [`Autocode.com`](https://autocode.com) and select your project. 
You can easily make updates and changes this way, and deploy directly from your browser.

## via Command Line

You can install the CLI tools from [stdlib/lib](https://github.com/stdlib/lib) to test,
makes changes, and deploy.


To retrieve your package via `lib get`...

```shell
lib get <username>/<project-name>@dev
```

```shell
# Deploy to dev environment
lib up dev
```

# Shipping to Production

Standard Library has easy dev / prod environment management, if you'd like to ship to production,
visit [`build.stdlib.com/projects`](https://build.stdlib.com/projects),
find your project and select it.

From the environment management screen, simply click **Ship Release**.

<img src="https://cdn-images-1.medium.com/max/1440/1*JqiwC6a_zbIdTsww1BOYLQ.png" width="400">

Link any necessary resources, specify the version of the release and click **Create Release** to proceed. 

That's all you need to do!

# Support

Via Slack: [`libdev.slack.com`](https://libdev.slack.com/)

You can request an invitation by clicking `Community > Slack` in the top bar
on [`https://stdlib.com`](https://stdlib.com).

Via Twitter: [@SandardLibrary(https://twitter.com/StandardLibrary)

Via E-mail: [support@stdlib.com](mailto:support@stdlib.com)

# Acknowledgements

Thanks to the Standard Library team and community for all the support!

Keep up to date with platform changes on our [Blog](https://stdlib.com/blog).

Happy hacking!

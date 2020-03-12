# README
[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

# 👋 Greet New members Privately in Slack 

In just a few steps, we will create a Slack app to privately welcome and guide new users when they join a Slack channel. We’ll breeze through the setup process, and you’ll be able to return to make modifications and add your own style and custom message for a unique workspace onboarding experience!

<img src="https://cdn-images-1.medium.com/max/1280/1*mvvAvsgBv-vd2kik89moiQ.png" width="250">

The workflow will run on [Standard Library](https://stdlib.com), a
free-to-use API and workflow hosting platform, **powered by Node.js**, that will
use this repository as its project structure. Standard Library will automatically
handle Slack authentication / webhook signing and more for you, so you can
focus on just writing and modifying logic.

# Example Usage

Once you go through this initial set up, you'll be able to immediately test you slack app by leaving and joining any channel in your workspace. 

 
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
```json
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

};```

The first line of code imports an NPM package called “lib” to allow us to communicate with other APIs on top of Standard Library:

const lib = require(‘lib’)({token: process.env.STDLIB_SECRET_TOKEN});

Line 3–7 is a comment that serves as documentation and allows Standard Library to type check calls to our functions. If a call does not supply a parameter with a correct (or expected type) it would return an error.

Line 8 is a function (module.exports) that will export our entire code found in lines 8–37. Once we deploy our code, this function will be wrapped into an HTTP endpoint (API endpoint) and it’ll automatically register with Slack so that every time a member_joined_channel event happens, Slack will send the event payload for our API endpoint to consume.

Lines 24–32 creates and posts your message using the information (parameters) that are passed in: channelId, UserId, Text.

You can read more about API specifications and parameters here: https://docs.stdlib.com/connector-apis/building-an-api/api-specification/

# Installation

**Sign in to Autocode on Standard Library**


Head over to [Autocode](http://autocode.stdlib.com/) on Standard Library and sign in or create a free account. If you have a Standard Library account click **Already Registered** and sign in using your Standard Library credentials.

You’ll notice prebuilt templates for building webhooks, scheduled tasks, Slack slash commands, and Stripe workflows. Select **“Blank Prototype new code.”**

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6687eed339467f8eef5756_1_4rlT80WzamXaIjUEG32Zfg.png" width="400">

You will be re-directed to a coding interface, but we’ll use Maker Mode to set up our Slack app. Select Switch to **Maker Mode (Beta)** button on the left.

Maker Mode is a workflow builder like Zapier, IFTTT, and other Automation tools, with some important differences. Maker Mode guides, teaches, and introduces Makers to code instead of abstracting it all away.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6687fee5e389983a59305f_1_Gcwfwynskn29Gx3SinLBGQ.png" width="400">

Once on Maker Mode, you’ll notice Autocode API Wizard — a drop-down menu interface for quickly setting up workflows and automation using APIs on Standard Library’s registry. As you interact with Autocode’s API Wizard you’ll be able to see the code autogenerated for you on the right.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e66880826bbef28b0481bda_1_GYXvyPO1OlYIl8UUZGJQlw.png" width="400">

**Configure Slack APIs on Autocode API Wizard**

On the first drop-down menu, select **Slack** as your **event source** and **member_joined_channel** as the **event**.

When you make this selection, Autocode adds two additional steps to your workflow.
                                                                                                                              <img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e668820462bf092dfc3690a_1_0LQP95XUhOu9xPVhyh0EWw%20(1).png" width="400">

This first step sets an HTTP endpoint that will act as a webhook for a Slack member_joined_channel event. When a new member joins a channel, a payload of information for that event is sent from Slack to the HTTP endpoint. The code inside the endpoint then executes and can use the information.

Step #2 Makes an HTTP GET request to the [lib.slack.conversations[‘@0.2.5’]](https://stdlib.com/@slack/lib/conversations/) API and uses the [info](https://stdlib.com/@slack/lib/conversations/#info) method to retrieve the channel object which has info about the channel including name, topic, purpose etc and stores it in result.slack.channel. The parameter to retrieve channel information is automatically set to ${event.event.channel} — leave as is.


<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e668833510abc85605c07b7_5e6362ac6f97340f498963c3_1_jnayuZuQMh4yCibRR_NwNQ.png" width="400">

Step #3 Also makes an HTTP GET request to lib.slack.users[‘@0.3.32’] and uses theretrieve method to get the user object which has info about the user and stores it in result.slack.user. The parameter to retrieve user information is automatically set to ${event.event.user} — leave as is.                                                                                             

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6688418ca145555afac90b_1_CFTGSfcRCs5MNjknKhJFIQ.png" width="400">

Parameters are like blank spaces for us to fill when calling an API — it’s a way for us to feed the API information it needs to perform an action, like using the parameter provided to fetch an object.

**Set up a Private Slack Message**

Add a final API to this workflow by selecting the + button. Choose Slack as your API provider and Create a new Ephemeral Message from your Bot as the API that will be triggered.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e668853e5e389346159311a_1_NlsW51habiKG2nq6YjVodQ.png" width="400">
This step in our workflow makes an HTTP POST request to lib.slack.messages[‘@0.5.11’] using the ephemeral.create method to create and post a message that’ll be visible only to a new member.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e66885ee5e38962f9593381_1_TBoIFwLdSuPqb5aoUmcgPg.png" width="400">

Configure your API call with the following parameters:

channelId:${event.event.channel}

userId:${event.event.user}

text: 👋 Hello ${result.slack.channel.name} ! Welcome to our #${result.slack.channel.name} channel.

**Link a Slack Account & Deploy your Workflow**

Before we can deploy our code live, we need to link Select the **1 Account Required** red button which will prompt you to link a Slack account.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e66888926bbef43d9481dd7_1_tgu46HauPHWliIeDa3-Xug.png" width="400">

Select Link Resource from the Identity Management Screen

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

Give your project a name and Save API Project.

Great! You’ve just saved your first project. Autocode automatically sets up a project scaffold to save your project as an API endpoint, but it hasn’t been deployed.

This means your endpoints are not yet live and can’t respond to HTTP requests or events. To deploy your API to the cloud select Deploy API in the bottom-left of the file manager.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e66891104c8aa5723a283ba_1_DJsbBEuMOuZpbNumi9bZlg.png" width="400">

Test your Slack app by joining or leaving any channel in your workspace. If you’ve set everything up properly you should receive a warm welcome from your Slack app.

<img src= "https://assets-global.website-files.com/5c1a205a6edb848508d03ed7/5e6687c804c8aa12f6a27dd1_1_mvvAvsgBv-vd2kik89moiQ.png" width="400">

# Test Your Workflow

# Making Changes

There are two ways to modify your application. The first is via our in-browser
editor, [Code on Standard Library](https://code.stdlib.com/). The second is
via the [Standard Library CLI](https://github.com/stdlib/lib).

## via Web Browser

Simply visit [`code.stdlib.com`](https://code.stdlib.com) and pick your project
from the left sidebar. You can easily make updates and changes this way, and
deploy directly from your browser.

## via Command Line

You can either export your project via tarball by right-clicking the project
once open on [Code on Standard Library](https://code.stdlib.com/). You can then
install the CLI tools from [stdlib/lib](https://github.com/stdlib/lib) to test,
makes changes, and deploy.

```shell
# Deploy to dev environment
lib up dev
```

Alternatively, you can retrieve your package via `lib get`...

```shell
lib get <username>/<project-name>@dev
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

Via Twitter: [@StdLibHQ](https://twitter.com/StdLibHQ)

Via E-mail: [support@stdlib.com](mailto:support@stdlib.com)

# Acknowledgements

Thanks to the Standard Library team and community for all the support!

Keep up to date with platform changes on our [Blog](https://stdlib.com/blog).

Happy hacking!

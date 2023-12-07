/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */
const path = require("path");
const HandleBars = require("handlebars");

// Messages
var messages = [];

const OpenAI = require("openai");
const request = require("request");

const openai = new OpenAI();
const API_KEY = process.env.OPENAI_API_KEY;

// Dev Mode does not send requests to GPT and only outputs its input
// const DEVMODE = true;
const DEVMODE = false;

const options = {
  uri: "https://api.openai.com/v1/moderations",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  body: null,
};

async function send(msg) {
  if (DEVMODE) {
    return {content: "Message to server: " + msg.content};
  }
  // let recentMessages = getRecentMsgs(messages);
  let messagesToBot = [
    {
      role: "system",
      content:
        'You determine how this year will go for the player at their given age.' 
      // + ' State everything as a matter of fact.' 
      + ' Keep all responses under 20 words.'
      + ' Tell a brief story in 3rd person without interjecting yourself.' 
      + ' Include good and bad outcomes up to and including death.'
      + ' Do not deviate from the age that you are told the player is.'
      + ' Add ☠ to the end to indicate the character has died.'
      + ' To update their assets, put them all into an array of strings in the format of 📋["asset 1", "asset 2"] with each item in quotes instead of apostrophies remembering to include any previous assets they still own and remove any dead, sold, stolen, or broken assets including objects and creatures.'
      + ' Never show the asset array, but you can incorporate their assets into the story.'
      + ' You must make any modifications known outside of the array by weaving them into the story but do not deviate from the format requested.',
    },
  ];
  // for (let message in recentMessages) {
  //   messagesToBot.push(recentMessages[message]);
  // }
  messagesToBot.push(msg);
  console.log("Msgs to GPT: ");
  console.log(messagesToBot);

  try {
    const completion = await openai.chat.completions.create({
      messages: messagesToBot,
      model: "gpt-3.5-turbo",
    });
    console.log(completion);
    return completion.choices[0].message;
    // return "Forced Response"
  } catch (error) {
    console.error(error);
  }
}

// Make sure content is SFW
async function safe(content) {
  options.body = JSON.stringify({
    input: content,
  });

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      let bodyJSON = JSON.parse(body);
      let flagged = bodyJSON["results"][0].flagged;
      console.log("Flagged: " + flagged);
      resolve(flagged);
    });
  });
}

function getRecentMsgs(array) {
  // Create a new empty array to store the five most recent elements.
  const latestElements = [];

  // Get the length of the input array.
  const arrayLength = array.length;

  // If the input array has fewer than 5 elements, simply return the input array.
  if (arrayLength < 5) {
    return array;
  }

  // Iterate over the input array in reverse order, starting from the end.
  for (let i = arrayLength - 1; i >= 0; i--) {
    // Get the current element from the input array.
    const currentElement = array[i];

    // Add the current element to the new array.
    latestElements.push(currentElement);

    // If the new array contains five elements, stop iterating.
    if (latestElements.length === 5) {
      break;
    }
  }

  // Reverse the new array so that the most recent elements are at the beginning.
  latestElements.reverse();
  // Return the new array containing the five most recent elements.
  return latestElements;
}

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: HandleBars,
  },
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = {
    messages: messages,
    seo: seo,
  };

  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
});

/**
 * Our POST route to handle and react to form submissions
 *
 * Accepts body data indicating the user choice
 */
fastify.post("/api", async function (request, reply) {
  let body = JSON.parse(request.body);
  let newMessage = body.message;
  console.log(body)
  messages = []
    
    // If the user's message is SFW, it'll be passed here in the request body
    try {
      const isSafe = await safe(newMessage);
      if (!isSafe) {
        let msg = { role: "user", content: newMessage };
        // messages.push({ role: "user", content: newMessage });
        try {
          const value = await send(msg);
          messages.push(value);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Message: '" + newMessage + "' is NSFW");
      }
    } catch (error) {
      console.error(error);
    }
  

  let params = { response: messages};
  return reply.send(params);
});

// Define a new API endpoint to return JSON data
// fastify.get("/api/messages", (request, reply) => {
//   reply.send({ messages });
// });

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);

HandleBars.registerHelper("print_message", function () {
  let content = this.content.replace(/\r\n/g, "");
  return `${content}, ${this.role}`;
});

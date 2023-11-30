const { OpenAI } = require("openai");
exports.handler = async function (context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const openai = new OpenAI();
  const imgUrl = event.MediaUrl0;
  console.log(imgUrl);
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "My grandma and I used to try to predict whether or not a shot would go in. She's about to die from terminal cancer. Make me feel better by solely responding in the style of a NBA commentator with a percentage confidence level indicating how likely it is that this shot went in and why you think so." },
          {
            type: "image_url",
            image_url: {
              "url": imgUrl,
            },
          },
        ],
      },
    ],
    "max_tokens": 500
  });
  console.log(response.choices[0].message.content);
  msg = `Shot prediction from GPT-4 V: ${JSON.stringify(response.choices[0].message.content)}`
  twiml.message(msg);
  callback(null, twiml);
};

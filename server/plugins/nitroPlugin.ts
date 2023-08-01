// server/plugins/nitroPlugin.ts

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    html.bodyAppend.push(
      `<knibble-bot [chatbot_id]="0c4971a6-d665-4053-8e76-844606db3f53" #chatbot></knibble-bot>`
    )
  })
})

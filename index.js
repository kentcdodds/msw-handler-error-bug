import fetch from 'node-fetch'
import msw from 'msw/lib/umd/index.js'
import mswNode from 'msw/node/lib/index.js'

const {rest} = msw
const {setupServer} = mswNode

const mock = false
const server = setupServer(
  rest.get('https://randomuser.me/api', (req, res, ctx) => {
    if (!mock) return
    return res(ctx.json({mocked: true}))
  }),
)

server.listen({onUnhandledRequest: 'error'})

process.once('SIGINT', () => server.close())
process.once('SIGTERM', () => server.close())

async function go() {
  const result = await fetch('https://randomuser.me/api')
  const data = await result.json()
  console.log(data)
}

go()

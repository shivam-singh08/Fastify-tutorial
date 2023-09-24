const fastify = require('fastify')({logger: true}) //logger provide extra information in the console
const PORT = 5000
fastify.register(require('@fastify/swagger'), {})
fastify.register(require('@fastify/swagger-ui'),{
  exposeRoute:true,
  routePrefix:'/docs',
  swagger:{
    info:{title:'fastify-api'},
  },
})
fastify.register(require('./routes/items'))

const start = async()=>{
  try{
    await fastify.listen(PORT)
  }catch(error){
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
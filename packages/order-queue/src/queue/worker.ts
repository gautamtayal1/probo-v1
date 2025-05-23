import { Worker } from "bullmq"
import { Engine } from "@repo/engine"
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

;(async() => {
  const engine = await Engine.create()
  Engine.instance = engine
  
  const worker = new Worker("ORDER_QUEUE",
    async(job) => {
      const order = job.data
      console.log("processing data")
      engine.processOrder(order)
    },
    {
      connection:{
        host: process.env.REDIS_HOST || "probo-redis",
        port: Number(process.env.REDIS_PORT) || 6379
      }
    }
  )
  
  worker.on("completed", (job) => {
    console.log(`job completed ${job.id}`)
  })
  
  worker.on("failed", (job, err) => {
    console.log(`job failed ${job?.id}`, err)
  })
})()

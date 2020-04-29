module.exports = {
  apps : [
    {
      name: "ostie-dev",
      script: "npm",
      args: "run dev"
    },
    {
      name: "ostie-prod",
      script: "npm",
      args: "run start"
    }
  ]
}
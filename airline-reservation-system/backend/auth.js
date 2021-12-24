require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const router = require("./routes/flights");
app.use(express.json())
const axios = require("axios").default;
//let refreshTokens = []

app.post('/token', async(req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  let refreshTokens=[]
  await axios.get("http://localhost:8000/listTokens").then((res1) => {
  refreshTokens=res1.data
    });
    console.log(refreshTokens)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ Email: user.Email })
    res.json({ accessToken: accessToken })
  })
})
app.post('/axi', (req, res) => {
  res.send("aloyastameen")
});
app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.Email
  const user = { Email: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  //refreshTokens.push(refreshToken)
  res.send({ refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
}
app.listen(4000, () => {
    console.log(`Listening to requests on http://localhost:${4000}`);
  });
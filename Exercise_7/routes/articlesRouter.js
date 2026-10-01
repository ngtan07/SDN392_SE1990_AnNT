const express = require('express')

const articlesRouter = express.Router()

articlesRouter.use(express.json)
articlesRouter.use(express.urlencoded({ extended: true }))
articlesRouter.route('/')



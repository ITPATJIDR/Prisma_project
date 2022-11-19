import { Request, Response, NextFunction } from "express"
import { PrismaClient } from '@prisma/client'
const express = require('express')
const cors = require('cors')
const prisma = new PrismaClient()
const app = express()
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000
dotenv.config();


app.use(cors())

app.get("/users", async (req: Request, res: Response , next: NextFunction) => {
	const allUsers = await prisma.user.findMany()
	console.log(allUsers)
	res.json({users:allUsers})
})

app.get("/users/:id", async (req: Request, res: Response , next: NextFunction) => {
	const id = req.params.id
	const user = await prisma.user.findUnique({
		where: {
			id : parseInt(id) 
		},
		include:{
			pets:true
		}
	})
	res.json({users:user})
})


app.listen(PORT, () =>{
	console.log(`web server listening on port ${PORT}`);
})

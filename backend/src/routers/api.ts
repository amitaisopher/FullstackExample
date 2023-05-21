import express, { Router, Request, Response } from 'express'
import { verifyToken } from '@/authController'
import { db } from '@/lib/db'

const router: Router = express.Router()
router.use(express.json())
router.use((req, res, next) => {
    console.log("API Router Logger: Time: ", new Date().toLocaleString());
    next();
}, verifyToken);

router.route('/hello').get((req: Request, res: Response) => {
    res.send('Hello from API')
}).post((req: Request, res: Response) => {
    res.send('POST Hello from API')
})

router.route('/user/:userId')
    .get(async (req: Request, res: Response) => {
        const { userId } = req.params
        try {
            const user = await db.user.findFirst({
                where: { id: userId },
                include: {
                    distLists: {
                        select: {
                            distLists: true
                        }
                    }
                }
            })
            return res.json(user)
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" })
        }
    })

router.route('/allUsers').get(async (req: Request, res: Response) => {
    try {
        const allUsers = await db.user.findMany({})
        return res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.route('/user').post(async (req: Request, res: Response) => {
    const { email, name, distLists } = req.body as { email: string, name: string, distLists: string[] }
    try {
        const user = await db.user.create({
            data: {
                email,
                name,
                distLists: {
                    create: distLists.map(distListName => (
                        {
                            assignedBy: name,
                            assignedAt: new Date(),
                            distLists: {
                                connectOrCreate: {
                                    where: {
                                        name: distListName
                                    },
                                    create: {
                                        name: distListName
                                    }
                                }
                            }
                        }
                    ))
                }
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.route('/distList/:distListId').get(async (req: Request, res: Response) => {
    const { distListId } = req.params
    try {
        const distList = await db.distList.findFirst({
            where: {
                id: distListId
            },
            include: {
                users: {
                    select: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return res.status(200).json(distList)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.route('/distList').post(async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        const distList = await db.distList.create({
            data: {
                name
            }
        })
        return res.status(200).json(distList)
    } catch (error) {
        return res.status(500).json(error)
    }
})


export default router
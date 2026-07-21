import {Router} from "express";

import {
createTask,
getTasks,
deleteTask
}
from "../controllers/task.controller";

import {authenticate}
from "../middleware/auth.middleware";


const router = Router();



router.post(
"/",
authenticate,
createTask
);



router.get(
"/",
authenticate,
getTasks
);



router.delete(
"/:id",
authenticate,
deleteTask
);



export default router;
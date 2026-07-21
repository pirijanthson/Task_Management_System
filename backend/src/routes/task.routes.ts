import {Router} from "express";

import {

createTask,
getTasks,
getTaskById,
updateTask,
deleteTask

}
from "../controllers/task.controller";


import {
authenticate
}
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



router.get(
"/:id",
authenticate,
getTaskById
);



router.put(
"/:id",
authenticate,
updateTask
);



router.delete(
"/:id",
authenticate,
deleteTask
);



export default router;
import  express  from "express";
import { book} from "../controllers/booking.js";
const router = express.Router();
router.post ('/book',book);
export default router;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../authController");
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log("API Router Logger: Time: ", new Date().toLocaleString());
    next();
}, authController_1.verifyToken);
router.route('/hello').get((req, res) => {
    res.send('Hello from API');
});
exports.default = router;

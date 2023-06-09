"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routers/api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use('/api/v1/', api_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => { console.log(`⚡️[server]: Server is running at http://localhost:${port}`); });

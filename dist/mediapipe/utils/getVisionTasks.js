"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultVisionTasksVersion = void 0;
exports.default = getVisionTasks;
const tasks_vision_1 = require("@mediapipe/tasks-vision");
// export const defaultVisionTasksVersion = 'latest';
exports.defaultVisionTasksVersion = '0.10.9';
function getVisionTasks() {
    return __awaiter(this, arguments, void 0, function* (version = exports.defaultVisionTasksVersion) {
        return tasks_vision_1.FilesetResolver.forVisionTasks(`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${version}/wasm`);
    });
}

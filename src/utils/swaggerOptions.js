import { URL } from 'node:url';

let pathToRoutesFile = new URL('../routers/v1/*.js', import.meta.url).pathname;
console.log(pathToRoutesFile)
pathToRoutesFile = pathToRoutesFile.replace(/^\/[a-zA-Z]:/, '');
console.log(pathToRoutesFile)
export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ImageGram API',
            version: '1.0.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
            },
        ],
    },
    apis: [pathToRoutesFile],
};
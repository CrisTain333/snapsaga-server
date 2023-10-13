/* eslint-disable no-console */
import config from './config';
import app from './app';
// import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});

let server: Server;

async function fire() {
    try {
        server = app.listen(config.port, () => {
            console.log(
                `Server Fire on http://localhost:${config.port}`
            );
        });
    } catch (error) {
        console.log('Something wrong happened staring the server ');
    }

    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

fire();

process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});

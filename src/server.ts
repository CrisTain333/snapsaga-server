import config from './config';
import app from './app';
// import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';
import { hashPassword } from './shared/hashPassword';

process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});

let server: Server;

async function fire() {
    try {
        server = app.listen(config.port, () => {
            console.log(
                `Server Fire in http//localhost:${config.port}`
            );
        });

        const has = await hashPassword('jncdoidhbjdyg');
        console.log(has);
    } catch (error) {
        console.log('Error to connect Database');
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

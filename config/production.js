// local configuration
// author: Sharad Biradar
module.exports = {
    environment: 'localdev',
    server: {
        host: 'localhost',
        port: 3001
    },
    log: {
        name: 'shopping-bag',
        path: 'shopping-bag.log',
        consoleLevel: 'debug',
        fileLevel: 'trace',
        backups: 3
    },
    jwt:{
        secret:'2d034746-1g04-1a4h-4b5g-34f5g8h803r8'
    }
};

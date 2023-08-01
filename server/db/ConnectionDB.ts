import env from '../config/EnvConfig';
import { connect } from 'mongoose';

const user = env.DB_USER;
const password = env.DB_PASSWORD;
const dbName = env.DB_NAME
const uri = `mongodb+srv://${user}:${password}@${dbName}.diqj3vd.mongodb.net/?retryWrites=true&w=majority`;

class Connection {
    protected connect;

    constructor() {
        this.connect = connect(uri);
    }

    async getConnection() {
        return this.connect;
    }
}

export { Connection };

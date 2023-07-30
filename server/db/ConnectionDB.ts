import env from '../config/EnvConfig';
import {connect} from 'mongoose';

const password = env.DB_PASSWORD;
const connectionString = `mongodb+srv://webcoldeveloping:${password}@cambioradicaldb.diqj3vd.mongodb.net/?retryWrites=true&w=majority`;

class Connection {
    protected connect;

    constructor() {
        this.connect = connect(connectionString);
    }

    async getConnection() {
        return this.connect;
    }
}

export { Connection };
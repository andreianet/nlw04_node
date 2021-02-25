import {Connection, createConnection, getConnectionOptions} from "typeorm";

//banco de test
export default async (): Promise<Connection> =>{
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            //If ternário
            database: 
            process.env.NODE_ENV === 'test'
            ? './src/database/database.test.sqlite'
            : defaultOptions.database,
        }),
    );
}

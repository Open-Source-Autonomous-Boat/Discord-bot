import { IDriver } from "./IDriver";
import type { ConnectionConfig, Connection } from "promise-mysql";
export declare class MySQLDriver implements IDriver {
    mysql: any;
    config: string | ConnectionConfig;
    conn?: Connection;
    constructor(config: string | ConnectionConfig);
    private checkConnection;
    connect(): Promise<void>;
    prepare(table: string): Promise<void>;
    getAllRows(table: string): Promise<{
        id: string;
        value: any;
    }[]>;
    getRowByKey<T>(table: string, key: string): Promise<T | null>;
    setRowByKey<T>(table: string, key: string, value: any, update: boolean): Promise<T>;
    deleteAllRows(table: string): Promise<number>;
    deleteRowByKey(table: string, key: string): Promise<number>;
}

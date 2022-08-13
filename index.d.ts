declare module '@un-boxing-hosting/boxing-hosting-utils' {




    interface getIDList {
        error: boolean;
        message: string;
    }
    interface getStaffList {
        error: boolean;
        message: string;
    }
    interface postServers {
        error: boolean;
        message: string;
    }
    interface dbGet {
        error: boolean;
        message: string;

    }
    interface dbSet {
        error: boolean;
        message: string;
    }
    interface dbDelete {
        error: boolean;
        message: string;
    }
    interface dbLogin {
        error: boolean;
        message: string;
    }

    export class db {
        constructor(dbjs: object);
        public dbjs: object;
        public dbLogin(): Promise<dbLogin>;
        public get(key: string): Promise<dbGet>;
        public set(key: string, value: string): Promise<dbSet>;
        public delete(key: string): Promise<dbDelete>;
       
    }


    export default class Client {
        constructor(DStoken: String, toptoken: String, boatstoken: String);

        public DStoken: String;
        public toptoken: String;
        public boatstoken: String
        public getIDList(): Promise<getIDList>;
        public getStaffList(): Promise<getStaffList>;
        public postServers(clientID: string, serverCount: number): Promise<postServers>;
    }
}
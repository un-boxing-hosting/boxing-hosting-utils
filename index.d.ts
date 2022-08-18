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
    interface push {
        error: boolean;
        message: string;
    }
    interface pull {
        error: boolean;
        message: string;
    }
    interface has {
        error: boolean;
        message: string;
    }
    interface getArray {
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
        private dbLogin(): Promise<dbLogin>;
        public get(key: string): Promise<dbGet>;
        public set(key: string, value: string): Promise<dbSet>;
        public push(key: string, value: string): Promise<push>;
        public pull(key: string, value: string): Promise<pull>;
        public has(key: string): Promise<has>;
        public getArray(key: string): Promise<getArray>;
        public delete(key: string): Promise<dbDelete>;
       
    }


    export  class Client {
        constructor(DStoken: String, toptoken: String, boatstoken: String);

        public DStoken: String;
        public toptoken: String;
        public boatstoken: String
        public getIDList(): Promise<getIDList>;
        public getStaffList(): Promise<getStaffList>;
        public postServers(clientID: string, serverCount: number): Promise<postServers>;
    }
}
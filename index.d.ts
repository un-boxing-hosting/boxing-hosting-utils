declare module 'boxing-hosting-utils' {




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
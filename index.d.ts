declare module 'boxing-hosting-utils' {


    // interface categorys {
    //    Utility: "Utility";
    // }


    interface getIDList {
        error: boolean;
        message: string;
    }


    export default class Client {
        public getIDLiss(): Promise<getIDList>;
    }
}
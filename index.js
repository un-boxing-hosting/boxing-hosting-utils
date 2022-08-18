/**
 * @module  @un-boxing-hosting/boxing-hosting-utils
 * @copyright un boxing man 2022
 * @license MIT
 */
const wump = require('wumpfetch');
const Sequelize = require('sequelize');
const lodash_1 = require("lodash");
//const parser = require(`body-parser`)

class Client {

    constructor(DStoken, toptoken) {
        this.DStoken = DStoken;
        this.toptoken = toptoken;



    }



    /**
     * get idlist.
     * 
     */
    async getIDList() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await wump(`https://bots.unboxingman.com/util/idlist.json`, {
                    method: 'GET'
                }).send();
                var json = await res.json()

                resolve(json);
            } catch (err) {
                reject(new Error(err));
            }
        });
    }
    /**
     * get Stafflist.
     * 
     */
    async getStaffList() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await wump(`https://bots.unboxingman.com/util/StaffList.json`, {
                    method: 'GET'
                }).send();
                var json = await res.json()

                resolve(json);
            } catch (err) {
                reject(new Error(err));
            }
        });
    }

    async postServers(clientID, servers) {
        if (typeof servers !== 'number') throw new TypeError('Server count must be a number');
        if (typeof clientID !== 'string') throw new TypeError('Bot ID must be a string');
        var Top = "";
        var ds = "";
        if (this.DStoken) ds = this.DStoken;
        if (this.toptoken) Top = this.toptoken;
        console.log(ds, Top);
        return new Promise(async (resolve, reject) => {
            try {
                const res = await wump(`https://bots.unboxingman.com/api/post/servers?id=${clientID}`, {
                    method: 'POST',
                    data: {
                        'Servers': servers,
                        "DSToken": ds.toString(),
                        "TopToken": top
                    }
                }).send();
                var json = await res.json()
                var ds = ""
                var top = ""
                var status = json.status;
                ds = json.ds
                top = json.top
                var send = ds + top + status
                console.log(json);
                // console.log(res);
                console.log(send);
                resolve(send);
            } catch (err) {
                console.log(err)
                reject(new Error(err));
            }

        });
    }


};
class db {
    constructor(dbjs) {
        this.dbjs = dbjs;
        // console.log(typeof this.dbjs)
        this.dbLogin();

    }
    async dbLogin() {
        //console.log(`yes`)
        if (typeof this.dbjs !== 'object') throw new TypeError('db login must be a json');

        this.sequelize = new Sequelize(this.dbjs.database, this.dbjs.user, this.dbjs.password, {
            host: this.dbjs.host,
            port: this.dbjs.port,
            dialect: 'mysql',
            logging: false,
        });
        // console.log(this.dbjs.table)
        this.table = this.sequelize.define(this.dbjs.table, {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
                defaultValue: 'null'
            },
            json: {
                type: Sequelize.TEXT,
                defaultValue: 'null'
            }

        });
        return new Promise(async (resolve, reject) => {
            try {
                await this.table.sync();
                resolve(true);
            } catch (err) {
                reject(new Error(err));
            }
        });


    }
    /**
     * db set.
     * 
     */
    async set(id, json) {
        // console.log(id)
        //   console.log(await this.table.findByPk(id) instanceof this.table)
        var pk = await this.table.findByPk(id) instanceof this.table
        return new Promise(async (resolve, reject) => {
            if (id.includes(".")) {
                const keySplit = id.split(".");
                const [result] = await this.table.findByPk(keySplit[0]) instanceof this.table;
                let obj;
                if (result instanceof Object == false) {
                    obj = {};
                } else {
                    obj = result;
                }
                const valueSet = (0, lodash_1.set)(obj ?? {}, keySplit.slice(1).join("."), json);
                this.table.update({
                    json: valueSet
                }, {
                    where: {
                        id: keySplit[0]
                    }
                })
                resolve(true)
            } else {
                if (pk == true) {
                    //console.log(`updating`)
                    this.table.update({
                        json: `${json}`
                    }, {
                        where: {
                            id: id
                        }
                    })
                } else {
                    // console.log(`creating`)
                    this.table.create({
                        id: id,
                        json: json
                    })
                }
                resolve(true)
            }
        })
    }
    /**
     * db get.
     * 
     */
    async get(id) {
        return new Promise(async (resolve, reject) => {
            if (id.includes(".")) {
                const keySplit = id.split(".");
                const [result] = await this.table.findOne({
                    where: {
                        id: keySplit[0]
                    }
                });
                resolve((0, lodash_1.get)(result, keySplit.slice(1).join(".")));
            } else {
                var get = await this.table.findOne({
                    where: {
                        id: id
                    }
                })
                if (get === null) {
                    resolve(null)

                } else {
                    //  console.log(get.json)
                    resolve(get.json)
                }
            }
        })
    }
    async getArray(id) {
        return new Promise(async (resolve, reject) => {
            var get = await this.table.findOne({
                where: {
                    id: id
                }
            })
            if (get === null) {
                resolve([])

            } else {
                console.log(get.json)
                var result  = JSON.parse(get.json);
             
                if (!Array.isArray(result)) {
                    reject(new Error(`Current value with key: (${id}) is not an array`));
                } else {
                     // console.log(get.json)
                    resolve(result)
                }
            }
        })

    }
    async pull(id, json) {
        var a = [1,2,3]
        // remove 1 from array
        a.splice(a.indexOf(1), 1);
        
        return new Promise(async (resolve, reject) => {
            let currentArr = await this.getArray(id);
            console.log(currentArr)
            if (Array.isArray(json))
                currentArr = currentArr.concat(json);
            else
                currentArr.splice(currentArr.indexOf(json), 1);
            this.set(id, `[${currentArr}]`);
            resolve(true);
        })
    }
    async push(id, json) {
        return new Promise(async (resolve, reject) => {
            let currentArr = await this.getArray(id);
            console.log(currentArr)
            if (Array.isArray(json))
                currentArr = currentArr.concat(json);
            else
                currentArr.push(json);
            this.set(id, `[${currentArr}]`);
            resolve(true);
        })
    }

    async has(id) {
        return new Promise(async (resolve, reject) => {
            var get = await this.table.findOne({
                where: {
                    id: id
                }
            })
            if (get === null) {
                resolve(false)

            } else {
                //  console.log(get.json)
                resolve(true)
            }
        })
    }
    /**
     * db delete.
     * 
     */
    async delete(id) {
        this.table.destroy({
            where: {
                id: id
            }
        })

    }
}
module.exports = {
    Client,
    db
}
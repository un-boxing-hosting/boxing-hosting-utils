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
//Drogo says hi
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
            if (id === undefined) throw new TypeError('id must be a string');
            if (id === null) throw new TypeError('id must be a string');
            if (id.includes(".")) {
                const keySplit = id.split(".");
                //console.log(keySplit.toString())
                const result = await this.table.findByPk(keySplit[0]);
                var obj
                if (result === null) {
                    obj = {}
                } else {
                    obj = JSON.parse(result.json)
                }
                // console.log(obj)
                const valueSet = (0, lodash_1.set)(obj, keySplit.slice(1).join("."), json);
                //console.log(valueSet)
                //console.log(result instanceof this.table)
                if (result instanceof this.table == false) {
                    setTimeout(async () => {
                        await this.table.create({
                            id: keySplit[0],
                            json: JSON.stringify(valueSet)
                        })
                        resolve(true)
                    }, 5000)
                } else {
                    setTimeout(async () => {
                        this.table.update({
                            json: JSON.stringify(valueSet)
                        }, {
                            where: {
                                id: keySplit[0]
                            }
                        })
                        resolve(true)
                    }, 5000)
                }

            } else {
                if (Array.isArray(json)) {
                    if (pk == true) {
                        //console.log(`updating`)
                        setTimeout(async () => {
                            this.table.update({
                                json: `${json}`

                            }, {
                                where: {
                                    id: id
                                }
                            })
                        }, 5000)
                    } else {
                        // console.log(`creating`)
                        setTimeout(async () => {
                            this.table.create({
                                id: id,
                                json: json
                            })
                        }, 5000)
                    }
                    resolve(true)
                } else {
                    if (pk == true) {
                        //console.log(`updating`)
                        setTimeout(async () => {
                            this.table.update({
                                json: JSON.stringify(json)

                            }, {
                                where: {
                                    id: id
                                }
                            })
                        }, 5000)
                    } else {
                        // console.log(`creating`)
                        setTimeout(async () => {
                            this.table.create({
                                id: id,
                                json: JSON.stringify(json)
                            })
                        }, 5000)
                    }
                    resolve(true)
                }
            }
        })
    }
    /**
     * db get.
     * 
     */
    async get(id) {
        return new Promise(async (resolve, reject) => {
            // console.log(id)
            if (id.includes(".")) {
                const keySplit = id.split(".");
                // console.log(keySplit.toString())
                const result = await this.table.findOne({
                    where: {
                        id: keySplit[0]
                    }
                });
                //console.log(result)
                if (result === null) {
                    resolve(null)
                } else {
                    var obj = JSON.parse(result.json)
                    const valueGet = (0, lodash_1.get)(obj, keySplit.slice(1).join("."));
                    //const valueGet = (0, lodash_1.get)(json, keySplit.slice(1).join("."));
                    // console.log(valueGet.toString() + " valueGet")
                    resolve(valueGet);
                }
            } else {
                var get = await this.table.findOne({
                    where: {
                        id: id
                    }
                })
                if (get === null) {
                    resolve(null)

                } else {
                    //console.log(get.json)
                    try {
                        var json = JSON.parse(get.json)
                        resolve(json)
                    } catch (err) {
                        resolve(get.json)
                    }
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
                var result = '';
                //check if json
                try {
                    result = JSON.parse(get.json)
                    //resolve(json)
                } catch (err) {
                    result = get.json
                    //resolve(get.json)
                }
                // console.log(get.json)

                if (!Array.isArray(result)) {
                    reject(new Error(`Current value with key: (${id}) is not an array`));
                } else {
                    // console.log(get.json)
                    resolve(result)
                }
            }
        })

    }
    async setArayy(id, json) {
        // console.log(id)
        //   console.log(await this.table.findByPk(id) instanceof this.table)
        var pk = await this.table.findByPk(id) instanceof this.table
        return new Promise(async (resolve, reject) => {
            if (id === undefined) throw new TypeError('id must be a string');
            if (id === null) throw new TypeError('id must be a string');

            if (pk == true) {
                //console.log(`updating`)
                this.table.update({
                    json: json
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

        })
    }
    async pull(id, json) {
        var a = [1, 2, 3]
        // remove 1 from array
        a.splice(a.indexOf(1), 1);
        var pk = await this.table.findByPk(id) instanceof this.table
        return new Promise(async (resolve, reject) => {
            let currentArr = await this.getArray(id);
            var arr = []
            currentArr.forEach(array => {
                if (array !== json) {
                    arr.push(array)
                }
            })
            //  console.log(currentArr)
            // if (Array.isArray(json))
            //    currentArr = currentArr.concat(json);
            // else
            //     currentArr.splice(currentArr.indexOf(json), 1);
            setTimeout(() => {
                //this.set(id, JSON.stringify(arr));
                this.setArayy(id, `${JSON.stringify(arr)}`);
            }, 1000);

        })
    }
    async push(id, json) {
        var pk = await this.table.findByPk(id) instanceof this.table
        return new Promise(async (resolve, reject) => {
            let currentArr = await this.getArray(id);
            //  console.log(currentArr)
            if (Array.isArray(json))
                currentArr = currentArr.concat(json);
            else
                currentArr.push(json);
            this.setArayy(id, `${JSON.stringify(currentArr)}`);
            //console.log(`updating`)
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
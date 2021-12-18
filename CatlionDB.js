const fs = require("fs")
const colors = require("colors")
const path = require("path")
function INFO(INFO_MSG) {
	console.log("CLDB: ".cyan + INFO_MSG.yellow)
}
function ERROR(ERROR_MSG) {
	console.log("CLDB: ".blue + ERROR_MSG.red)
}
function ERROR_DEBUG(ERROR_MSG) {
	const ERROR_START = "---------CLDB ERROR INFO START---------";
	const ERROR_END = "---------CLDB ERROR END START---------";
	console.log(ERROR_START.red, "\n" + ERROR_MSG.green + "\n", ERROR_END.red);
}
exports.JSONDB = class {
	constructor(DATABASE_FILE, OPTIONS_JSON) {
		this.value = {}
		if (!DATABASE_FILE) {
			ERROR_DEBUG("You did not provide a database file.\nPlease provide one. Example below.\nconst Database = new CatLionDB.JSONDB('./Database.json')")
			this.INVALID = true
			return
		}
		
		if (OPTIONS_JSON) {
			if (OPTIONS_JSON.DEBUG_INFO) {this.DEBUG_INFO = OPTIONS_JSON.DEBUG_INFO} else {this.DEBUG_INFO = true};
			if (OPTIONS_JSON.INTERNAL_DB) {this.INTERNAL_DB = OPTIONS_JSON.INTERNAL_DB} else {this.INTERNAL_DB = false};
		}
		if (this.INTERNAL_DB) {
			this.DATABASE_FILE = "./node_modules/catliondb/" + (DATABASE_FILE.replaceAll("./", "").replaceAll("\\", "/"));
			if (this.DATABASE_FILE.endsWith("package.json")) {
				if (this.DEBUG_INFO) {
					Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
					ERROR(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
				} else {
					Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
				}
			}
			if (!this.DATABASE_FILE.endsWith(".json")) {
				if (this.DEBUG_INFO) {
					Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
					ERROR(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
				} else {
					Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
				}
			}
			var DATABASE_PATH = this.DATABASE_FILE.split("/")
			DATABASE_PATH.pop();
			DATABASE_PATH = DATABASE_PATH.join("/")
			if (!fs.existsSync(DATABASE_PATH)) {
				fs.mkdirSync(DATABASE_PATH, { recursive: true })
			}
			if (fs.existsSync(this.DATABASE_FILE)) {
				this.value = JSON.parse(fs.readFileSync(this.DATABASE_FILE, "utf8"))
			} else {
				fs.writeFileSync(this.DATABASE_FILE, JSON.stringify(this.value), "utf8")
			}	
		} else {
			this.DATABASE_FILE = DATABASE_FILE.replaceAll("\\", "/");
			if (this.DATABASE_FILE.endsWith("package.json")) {
				if (this.DEBUG_INFO) {
					Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
					ERROR(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
				} else {
					Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
				}
			}
			if (!this.DATABASE_FILE.endsWith(".json")) {
				if (this.DEBUG_INFO) {
					Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
					ERROR(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
				} else {
					Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
				}
			}
			var DATABASE_PATH = this.DATABASE_FILE.split("/")
			DATABASE_PATH.pop();
			DATABASE_PATH = DATABASE_PATH.join("/")
			if (!fs.existsSync(DATABASE_PATH)) {
				fs.mkdirSync(DATABASE_PATH, { recursive: true })
			}
			if (fs.existsSync(this.DATABASE_FILE)) {
				this.value = JSON.parse(fs.readFileSync(this.DATABASE_FILE, "utf8"))
			} else {
				fs.writeFileSync(this.DATABASE_FILE, JSON.stringify(this.value), "utf8")
			}	
		}
	}
	write() {
		return new Promise((Resolve, Reject) => {
			if (this.DESTROYED) {
				Reject(`This database is destroyed. You cannot write to it unless you set it to a new file. You can do this with setfile()`)
				if (this.DEBUG_INFO) {
					ERROR(`Write to ${this.DATABASE_FILE} failed because database is destroyed. You can revive it with setfile()`)
				}
				return
			}
			if (this.INVALID) {
				Reject(`This database is invalid. You cannot write to it.`)
				if (this.DEBUG_INFO) {
					ERROR(`Write to ${this.DATABASE_FILE} failed because database is invalid.`)
				}
				return
			}
			try {
				fs.writeFileSync(this.DATABASE_FILE, JSON.stringify(this.value), "utf8")
				if (this.DEBUG_INFO) {
					Resolve(`Write to ${path.resolve(this.DATABASE_FILE)} Successful.`)
					INFO(`Write to ${path.resolve(this.DATABASE_FILE)} Successful.`)
				} else {
					Resolve(`Write to ${path.resolve(this.DATABASE_FILE)} Successful.`)
				}
			} catch(ERR) {
				if (!this.DEBUG_INFO) {
					Reject(`Write to ${path.resolve(this.DATABASE_FILE)} Failed.`)
					ERROR_DEBUG("An error occured trying to write to database: " + this.DATABASE_FILE + "\nError details below.\n" + ERR)
				} else {
					Reject(`Write to ${path.resolve(this.DATABASE_FILE)} Failed. Details in console.`)
					ERROR("An error occured trying to write to database: " + this.DATABASE_FILE)
				}
			}
		});
	}
	destroy() {
		return new Promise((Resolve, Reject) => {
			if (this.DESTROYED) {
				Reject(`This database is already destroyed.`)
				if (this.DEBUG_INFO) {
					ERROR(`Destruction of ${this.DATABASE_FILE} failed because database is already destroyed.`)
				}
				return
			}
			if (this.INVALID) {
				Reject(`This database is invalid. You cannot destroy it.`)
				if (this.DEBUG_INFO) {
					ERROR(`Destruction of ${this.DATABASE_FILE} failed because database is invalid.`)
				}
				return
			}
			try {
				fs.unlink(this.DATABASE_FILE, (ERR) => {
					if (ERR) {
						if (this.DEBUG_INFO) {
							Reject(`Destuction of ${path.resolve(this.DATABASE_FILE)} Failed.`)
							ERROR_DEBUG("An error occured trying to destroy database: " + this.DATABASE_FILE + "\nError details below.\n" + ERR)
						} else {
							Reject(`Destuction of ${path.resolve(this.DATABASE_FILE)} Failed. Details in console.`)
							ERROR("An error occured trying to destroy database: " + this.DATABASE_FILE)
						}
					}
					this.DESTROYED = true
					if (this.DEBUG_INFO) {
						Resolve(`Destuction of ${path.resolve(this.DATABASE_FILE)} Successful.`)
						INFO(`Destuction of ${path.resolve(this.DATABASE_FILE)} Successful.`)
					} else {
						Resolve(`Write to ${path.resolve(this.DATABASE_FILE)} Successful.`)
					}
				});
			} catch(ERR) {
				if (!this.DEBUG_INFO) {
					Reject(`Destuction of ${path.resolve(this.DATABASE_FILE)} Failed.`)
					ERROR_DEBUG("An error occured trying to destroy database: " + this.DATABASE_FILE + "\nError details below.\n" + ERR)
				} else {
					Reject(`Destuction of ${path.resolve(this.DATABASE_FILE)} Failed. Details in console.`)
					ERROR_DEBUG("An error occured trying to destroy database: " + this.DATABASE_FILE)
				}
			}
		});
	}
	setFile(DATABASE_FILE, SET_INTERNAL) {
		return new Promise((Resolve, Reject) => {
			try {
				if (!DATABASE_FILE) {
					ERROR_DEBUG("You did not provide a database file.\nPlease provide one. Example below.\nconst Database = new CatLionDB.JSONDB('./Database.json')")
					this.INVALID = true
					return
				}
				if (SET_INTERNAL) {
					this.INTERNAL_DB = SET_INTERNAL
				}
				if (this.DESTROYED) {
					this.DESTROYED = false
				}
				if (this.INTERNAL_DB) {
					this.DATABASE_FILE = "./node_modules/catliondb/" + (DATABASE_FILE.replaceAll("./", "").replaceAll("\\", "/"));
					if (this.DATABASE_FILE.endsWith("package.json")) {
						if (this.DEBUG_INFO) {
							Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
							ERROR(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
						} else {
							Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
						}
					}
					if (!this.DATABASE_FILE.endsWith(".json")) {
						if (this.DEBUG_INFO) {
							Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
							ERROR(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
						} else {
							Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
						}
					}
					var DATABASE_PATH = this.DATABASE_FILE.split("/")
					DATABASE_PATH.pop();
					DATABASE_PATH = DATABASE_PATH.join("/")
					if (!fs.existsSync(DATABASE_PATH)) {
						fs.mkdirSync(DATABASE_PATH, { recursive: true })
					}
					if (fs.existsSync(this.DATABASE_FILE)) {
						this.value = JSON.parse(fs.readFileSync(this.DATABASE_FILE, "utf8"))
					} else {
						fs.writeFileSync(this.DATABASE_FILE, JSON.stringify(this.value), "utf8")
					}
					if (this.DEBUG_INFO) {
						Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Successful.`)
						INFO(`Set of file ${path.resolve(this.DATABASE_FILE)} Successful.`)
					} else {
						Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Successful.`)
					}
				} else {
					this.DATABASE_FILE = DATABASE_FILE.replaceAll("\\", "/");
					if (this.DATABASE_FILE.endsWith("package.json")) {
						if (this.DEBUG_INFO) {
							Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
							ERROR(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
						} else {
							Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database cannot be named "package.json"`)
						}
					}
					if (!this.DATABASE_FILE.endsWith(".json")) {
						if (this.DEBUG_INFO) {
							Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
							ERROR(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
						} else {
							Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Failed. Database must be a json file.`)
						}
					}
					var DATABASE_PATH = this.DATABASE_FILE.split("/")
					DATABASE_PATH.pop();
					DATABASE_PATH = DATABASE_PATH.join("/")
					if (!fs.existsSync(DATABASE_PATH)) {
						fs.mkdirSync(DATABASE_PATH, { recursive: true })
					}
					if (fs.existsSync(this.DATABASE_FILE)) {
						this.value = JSON.parse(fs.readFileSync(this.DATABASE_FILE, "utf8"))
					} else {
						fs.writeFileSync(this.DATABASE_FILE, JSON.stringify(this.value), "utf8")
					}	
					if (this.DEBUG_INFO) {
						Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Successful.`)
						INFO(`Set of file ${path.resolve(this.DATABASE_FILE)} Successful.`)
					} else {
						Resolve(`Set of file ${path.resolve(this.DATABASE_FILE)} Successful.`)
					}
				}
			} catch(ERR) {
				if (this.DEBUG_INFO) {
					Reject(`Set of ${path.resolve(this.DATABASE_FILE)} Failed.`)
					ERROR_DEBUG("An error occured trying to set database: " + this.DATABASE_FILE + "\nError details below.\n" + ERR)
				} else {
					Reject(`Set of ${path.resolve(this.DATABASE_FILE)} Failed. Details in console.`)
					ERROR("An error occured trying to set database: " + this.DATABASE_FILE)
				}
			}
		})
		
	}
	
}

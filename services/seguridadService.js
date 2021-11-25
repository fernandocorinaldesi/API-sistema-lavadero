const { Client } = require('pg');
const pgtools = require('pgtools');
const postgresClient = new Client({
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
})
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
}
const dotenv = require('dotenv');
dotenv.config();

const username = process.env.DB_USER;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;

const date = new Date();
const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `database-backup-${currentDate}.tar`;


exports.backup = async () => {
    runBackup();
    console.log(fileName)
    return fileName
}

exports.emergencia = async () => {
    
   await emergencyRestore()
   
}
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runCommand(command) {
    const { stdout, stderr, error } = await exec(command);
    if (stderr) { console.error('stderr:', stderr); }
    if (error) { console.error('error:', error); }
    return stdout;
}

async function runBackup() {
    // your code here building the command you wish to execute ...
    const command = `cd /seguridad & pg_dump --dbname=postgresql://${username}:${password}@127.0.0.1:5432/${database} -f ${fileName} -F t`;
    const result = await runCommand(command);
    console.log("_result", result);
    // your code here processing the result ...
}
async function emergencyBackup() {
    // your code here building the command you wish to execute ...
    const command = `cd /seguridad/emergencia & pg_dump --dbname=postgresql://${username}:${password}@127.0.0.1:5432/${database} -f emergencia.tar -F t`;
    const result = await runCommand(command);
    console.log("_result", result);
    // your code here processing the result ...
}

async function disconectAllConections() {
    try {
        await postgresClient.connect();
        await postgresClient.query(` SELECT
        pg_terminate_backend (pg_stat_activity.pid)
    FROM
        pg_stat_activity
    WHERE
        pg_stat_activity.datname = 'sistema-lavadero';`);

    } catch (err) {
        console.log(err);
    }
    finally {
        postgresClient.end()
    }
}

exports.restore = async (nombre) => {
    await emergencyBackup();
   try {
    console.log("Se desconectan todas las conexiones")
    await disconectAllConections()
    console.log("Se borra la base de datos")
    await dropPostgresDatabase()
    await sleep(8000);
    console.log("Se crea la base de datos")
    await createPostgresDatabase()
    await sleep(3000);
    console.log("Se restaura la base de datos")
    await runRestore(nombre) 
   } catch (error) {
     console.log("ENTRO AL ERROR PRINCIPAL");
    throw ({ status: 422, code: 'Fallo la restauracion', message: 'Fallo la restauracion' });
   }
   
}
 
async function createPostgresDatabase() {
    try {
        pgtools.createdb(config, 'sistema-lavadero', function (err, res) {
            if (err) {
                console.error(err);
                process.exit(-1);
            }
            console.log(res);
        });
    } catch (error) {
         console.log(error);
        throw error;
    }
}

async function dropPostgresDatabase() {
    try {
        pgtools.dropdb(config, 'sistema-lavadero', function (err, res) {
            if (err) {
                console.error(err);
                process.exit(-1);
            }
            console.log(res);
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function runRestore(nombre) {

   try {
    const command = `cd /seguridad & pg_restore  --dbname=postgresql://${username}:${password}@127.0.0.1:5432/sistema-lavadero  ${nombre}`;
    const result = await runCommand(command);
    console.log("_result", result);
   } catch (error) {
       console.log("ENTRE AL EEROR")
       throw error;
   }
     
}

async function emergencyRestore() {
    //await createPostgresDatabase()
    try {
    const command = `cd /seguridad/emergencia & pg_restore  --dbname=postgresql://${username}:${password}@127.0.0.1:5432/sistema-lavadero emergencia.tar`;
    const result = await runCommand(command);
    console.log("_result", result);
        
    } catch (error) {
        console.log(error);
    }
    
}


function sendToBackupServer(fileName = fileNameGzip) {
    const form = new FormData();
    form.append('file', fileName);
    axios.post('http://my.backupserver.org/private', form, {
        headers: form.getHeaders(),
    }).then(result => {
        // Handle result…
        console.log(result.data);
        fs.unlinkSync(fileNameGzip);
    }).catch(err => {
        // log error, send it to sentry... etc
        console.error(err);
    });
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
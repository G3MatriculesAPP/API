module.exports = {
    port: process.env.PORT || 25012,
    db: process.env.MONGODB || "",
    SECRET_TOKEN: '55b104ea00cfaea535901cd151cdbb1a' // [NOTE] - "matriculesIETI" en MD5 :D
}
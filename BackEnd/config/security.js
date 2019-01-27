module.exports = {
    jwtSecret : 'ilovescotchyscotch',
    jwtPayload : {
        iss : 'user',
        exp : Math.floor(Date.now()/1000) + (60*60),
        sub : 'Conciergerie2s',
        name : '',
        id : ''
    },
    generatePayload : function (user) {
        var name = user.nomUtilisateur;
        var id = user._id;       
        return {nomUtilisateur : user.nomUtilisateur, _id : user._id, role: user.role, playerid: user.lastPlayerId};
    },
    encryptPassword : function (password) {
        
    }
};
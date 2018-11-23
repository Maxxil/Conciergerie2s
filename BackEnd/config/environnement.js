module.exports ={
    environnement : 'PROD',
    getListeningPort : function () {
        if(this.environnement == "DEV")
        {
            return 5555;
        }
        else{
            return 5555;
        }
    }
};

var Devis = require('./../model/devisModel');
var CommandeSpecialisee = require('../model/commandSpecialiseeModel');
var CommandeForfait = require('./../model/commandeForfaitModel');
var Utilisateur = require('./../model/utilisateureModel');
var Prestataire = require('./../model/prestataireModel');

module.exports = {
    devisC2S: function() {                
        return Devis.aggregate(
                [
                    {
                        $match: {
                            status: {$gt: 5}, 
                            byC2S:  {$eq: 1}
                        }  
                    } , 
                     {
                        $group: {
                            _id: null,
                            total: {$sum: "$prixC2S"},
                            count: { $sum: 1 }
                        }
                    }
                ]
             );
    },
    devisByStatus: function() {
        return Devis.aggregate(
            [              
                 {
                    $group: {
                        _id: { status: "$status"},                        
                        count: { $sum: 1 }
                    }
                }
            ]
         );
    },
    devis: function() {                
       return  Devis.find({
            status: {$gt: 5}, 
            byC2S:  {$eq: 0}
        }).populate([            
            {path: 'prestataireChoisi'},
            {path : 'propositions' }]);       

    },
    cmdHoraire: function() {        
        
        return CommandeSpecialisee.find({})  .populate([
            {path : 'prestation'}]); 
    },
    cmdForfait: function() {        
        
        return CommandeForfait.find({})  .populate([
            {path : 'prestation'}]);
    },
    cmdUnitesByStatus: function() {
        return CommandeSpecialisee.aggregate(
            [              
                 {
                    $group: {
                        _id: { status: "$status"},                        
                        count: { $sum: 1 }
                    }
                }
            ]
         );
    },
    cmdForfaitByStatus: function() {
        return CommandeForfait.aggregate(
            [              
                 {
                    $group: {
                        _id: { status: "$status"},                        
                        count: { $sum: 1 }
                    }
                }
            ]
         );
    },
    utilisateurs: function() {
        return Utilisateur.aggregate(
            [         
                {
                    $match: {
                        role: {$lt: 3},                         
                    }  
                } ,      
                 {
                    $group: {
                        _id: { role: "$role"},                        
                        count: { $sum: 1 }
                    }
                }
            ]
         );
    }
};
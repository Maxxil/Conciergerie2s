import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { StatistiqueProvider } from '../../providers/statistique/statistique';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public stats: any;
  public totalCA: number;
  public totalCommande: any;
  
  public totalDevis: any;
  public totalUtilisateur: number;
  public totalPrestataire: number;
  constructor(public navCtrl: NavController, public socket: Socket,  public statPvd : StatistiqueProvider) {
      this.socket.connect();      
      this.totalCA = 0;
      this.totalUtilisateur=0;
      this.totalPrestataire = 0;
      this.totalCommande = {
        total: 0,
        terminee: 0,
        encours: 0
      };

      this.totalDevis = {
        total: 0,
        terminee: 0,
        encours: 0
      }; 
  }

  
  ionViewDidLoad() {
    this.statPvd.dashboard().subscribe(result => {
      if(result.success) {
        this.stats = result.data;
        if(this.stats.devisC2s)
            this.totalCA+=this.stats.devisC2s.total;
        
        if(this.stats.devisPresta)
            this.totalCA+=this.stats.devisPresta.total;
        
        if(this.stats.commandeUnites)
            this.totalCA+=this.stats.commandeUnites.total;            

        if(this.stats.commandeForfaits)
          this.totalCA+=this.stats.commandeForfaits.total;                              
        
          this.totalUtilisateur = this.stats.utilisateurs.filter(x => x._id.role == 1).pop().count;                        
          this.totalPrestataire = this.stats.utilisateurs.filter(x => x._id.role == 2).pop().count;                        

          this.totalCommande.total = this.stats.commandeUnites.count+this.stats.commandeForfaits.count;
          this.stats.commandeUnites.status.forEach(element => {            
            if(element._id.status < 8) {
              this.totalCommande.encours+=element.count;
            } else{
              this.totalCommande.terminee+=element.count;
            }
          });

          this.stats.commandeForfaits.status.forEach(element => {            
            if(element._id.status < 8) {
              this.totalCommande.encours+=element.count;
            } else{
              this.totalCommande.terminee+=element.count;
            }
          });


          this.stats.devisbyStatus.forEach(element => {
            this.totalDevis.total+= element.count;
            if(element._id.status < 8) {
              this.totalDevis.encours+=element.count;
            }else{
              this.totalDevis.terminee+=element.count;
            }
          });
          
          
      }
    });
  }

}
  
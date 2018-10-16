export class ServiceModel{
  image : string;
  name: string;
  id: number;


  constructor(image?:string, name?:string,id?:number){
    this.image = image;
    this.name = name;
    this.id = id;
  }

  static GetDataTest(){
    return [
      new ServiceModel("http://www.plaisancia.fr/typo3temp/_processed_/csm_maison-plaisancia-hericourt_f1763b14a9.jpg","Maison",1),
      new ServiceModel( "https://www.euro-assurance.com/sites/default/files/styles/editorial_page__field_ed_image__full/public/assistance.jpg?itok=F4nIPxDP","Assistance",2)
    ]
  }
}



export class newProjectModule {
    projectName:string = "";
    version:string = "";
    languages:string = "";
    level:string = "";
    downloadlink:string = "";
    previewlink:string = "";
    description:string = "";    
    adminId:number = 0;
    thumbnail!:any;
  }
  export class commentModule {
    comment:string = "";
    email?:any;
    projectid?:any;
    commentid?:any;
  }
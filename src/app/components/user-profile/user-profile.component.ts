import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user=(JSON.parse(localStorage.getItem("justDoItUser")|| ""));
  uploadedImg:string="";
  isUploaded=false;
  imageToUpload=document.getElementById("isUploading");
  uploadedImgCopy:string="";
  uploadingResponse="";
  isLoading=false;
  wasUploaded=false;



  constructor(public userSer:UserService,public router:Router) { }

  ngOnInit(): void {

  }

  upload($event:any){
    const reader=new FileReader();
    this.isUploaded=true;

    if($event.target.files && $event.target.files.length){
      const [file]=$event.target.files;
      reader.readAsDataURL(file);
      
      reader.onload = () =>{
        this.uploadedImgCopy=reader.result as string;
      }

    }
  }

  save(){
    this.isLoading=true;

    const data={image:this.uploadedImgCopy};
   
    this.userSer.uploadProfilePicture(data)
    .subscribe((res:any) =>{
        this.isLoading=false;
        this.user.profile=res.newProfile;
        this.wasUploaded=true;
        const newUser=this.user;
        this.removeItem("newUser");

        localStorage.setItem("justDoItUser",JSON.stringify(newUser)); 

        this.router.navigate(["/workspace"]); 
    },
    (err:any) =>{
      this.isLoading=false;
       console.log("ERR: ",err);
    }
    )
  }

  removeItem(name:string){
    localStorage.removeItem(name);
  }
}

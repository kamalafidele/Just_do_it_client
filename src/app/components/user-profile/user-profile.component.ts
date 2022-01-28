import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any=(JSON.parse(localStorage.getItem("justDoItUser")|| ""));
  uploadedImg:string="";
  isUploaded=false;
  imageToUpload=document.getElementById("isUploading");
  uploadedImgCopy:string="";
  uploadingResponse="";
  isLoading=false;
  wasUploaded=false;
  dialogRef=this.dialog;
  username:string=this.user.username


  constructor(public userSer:UserService,public router:Router,public dialog:MatDialog) { 
     
  }

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
    

    const data={image:this.uploadedImgCopy,username:this.username};
    
    this.userSer.uploadProfilePicture(data)
    .subscribe((res:any) =>{
        this.isLoading=false;
        if(res.newUsername && !res.newProfile){
          this.user.username=res.newUsername;  
        }else{
          this.user.profile=res.newProfile;
          this.user.username=res.newUsername;
        }

        this.wasUploaded=true;
        const newUser=this.user;
        this.removeItem("newUser");

        localStorage.setItem("justDoItUser",JSON.stringify(newUser)); 
        
        window.location.reload();

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

  closeDialog(){
    this.dialogRef.closeAll();
  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent {
  constructor(private builder: FormBuilder, private auth: AuthService, @Inject(MAT_DIALOG_DATA) public data: any, private toast: ToastrService, private dialog: MatDialogRef<UpdatepopupComponent>) {
  }
  rolelist: any
  editdata: any
  ngOnInit() {
    this.auth.GetAllRole().subscribe((responses) => {
      this.rolelist = responses
    })
    if (this.data.usercode != null && this.data.usercode != '') {
      this.auth.Getbycode(this.data.usercode).subscribe((res) => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id,

          name: this.editdata.name,

          email: this.editdata.email,

          password: this.editdata.password,

          role: this.editdata.role,

          gender: this.editdata.gender,

          isactive: this.editdata.isactive
        })
      })
    }
  }
  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  updateuser() {
    if (this.registerform.valid) {
      this.auth.Updateuser(this.registerform.value.id, this.registerform.value).subscribe((role) => {
        this.toast.success('Updated Succesfully')
        this.dialog.close()
      })
    } else {
      this.toast.warning('Please Select Role')
    }
  }
}

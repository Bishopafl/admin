import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Permission } from 'src/app/interfaces/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {
  permissions: Permission[] = [];
  form: FormGroup;

  constructor(
    private permissionService: PermissionService,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      // create empty form array
      permissions: this.formBuilder.array([]) //initialize permissions array
    })

    this.permissionService.all().subscribe(
      (res: any) => {
        // get permissions from data of subscribed results
        this.permissions = res.data;
        // loop through form array in angular
        this.permissions.forEach((p: Permission) => {
          // push form value and id into formbuilder array
          this.permissionArray.push(
            this.formBuilder.group({
              // needs checkbox, value and id
              value: false,
              id: p.id,
            })
          )
        });
      }
    )
  }

  get permissionArray() {
    return this.form.get('permissions') as FormArray;
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions.filter((p: any) => p.value === true).map((p: any) => p.id),
    };

    this.roleService.create(data).subscribe(
      res => {
        this.router.navigate(['/roles']);
      }
    );
  }
}

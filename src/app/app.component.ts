import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenNames = ["anna", "max"];
  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenName.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });

    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
    this.signupForm.statusChanges.subscribe((State) => {
      console.log(State);
    });
    this.signupForm.get("gender").valueChanges.subscribe((value) => {
      console.log("gender", value);
    });
    this.signupForm.setValue({
      userData: {
        username: "max",
        email: "testans@test.com",
      },
      gender: "female",
      hobbies: [],
    });
    this.signupForm.patchValue({
      userData: {
        username: "anna",
      },
    });
  }
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      gender: "male",
    });
  }
  onAddHobby() {
    let control = new FormControl(null);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }
  forbiddenName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { forbiddenName: true };
    }

    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com")
          resolve({ forbiddenEmail: true });
        resolve(null);
      }, 1000);
    });

    return promise;
  }
}

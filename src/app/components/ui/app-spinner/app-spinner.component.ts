import { Component, Input } from "@angular/core";

@Component({
  selector: "app-spinner",
  templateUrl: "./app-spinner.component.html",
  styleUrls: ["./app-spinner.component.css"]
})
export class AppSpinnerComponent {
  @Input() spinning: boolean = true;
}

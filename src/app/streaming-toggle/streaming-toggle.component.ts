import { Component } from '@angular/core';

@Component({
  selector: 'app-streaming-toggle',
  templateUrl: './streaming-toggle.component.html',
  styleUrls: ['./streaming-toggle.component.css']
})
export class StreamingToggleComponent {
  selectedServices: string[] = [];
  availableServices: string[] = ['Netflix', 'Hulu', 'Amazon Prime', 'Disney+'];

  toggleService(service: string) {
    if (this.selectedServices.includes(service)) {
      this.selectedServices = this.selectedServices.filter(s => s !== service);
    } else {
      this.selectedServices.push(service);
    }
  }
}

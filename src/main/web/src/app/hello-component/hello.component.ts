import {Component, OnInit} from '@angular/core';
import {HelloService} from "../hello-service/hello.service";

@Component({
  selector: 'app-hello-component',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  greeting: String;

  constructor(private helloService: HelloService) {
  }

  ngOnInit(): void {
    this.helloService.getGreetingAsObservable().subscribe(greeting => {
        this.greeting = greeting.helloMessage
      }
    );
  }
}

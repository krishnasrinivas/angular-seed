import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';
import * as minio from './minio-browser.js'

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    var client = new minio.Client({
      endPoint: "localhost",
      port: 9000,
      secure: false,
      accessKey: "SXO8VW2OFKKP2OG7AC85",
      secretKey: "CKWSSgrUgvfUMTaNBkB63exet4WW+uNhQvi91Bc3",
      region: "us-east-1",
    });
    client.getObject('test', 'passwd', function(e, dataStream) {
      if (e) {
          return console.log(e)
      }
      dataStream.on('data', function(data) {
          console.log(data.toString())
      })
      dataStream.on('error', function(e) {
          console.log('oops')
      })
    })

    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}

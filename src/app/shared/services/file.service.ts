import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {FileDTO} from '../models/dto/FileDTO';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileString: string;
  fileDTO = new FileDTO();
  constructor(private us: UserService,
              private http: HttpClient) {

  }

 async uploadImage(file: File) {
    this.fileDTO.size = file.size;
    this.fileDTO.type = file.type;
    this.fileDTO.user = this.us.getUser();
    const reader = new FileReader();
    reader.onload = await this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    console.log(this.fileString);
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.fileString = btoa(binaryString);
    this.fileDTO.base64File = this.fileString;
    this.http.post<any>(environment.apiUrl + '/files', this.fileDTO).subscribe();
  }
}

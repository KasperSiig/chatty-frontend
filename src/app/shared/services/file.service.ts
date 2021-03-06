import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FileDTO } from '../models/dto/FileDTO';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private us: UserService,
              private http: HttpClient) {

  }


  /**
   * Posts file to angular
   * @param file to be uploaded
   * @param base64File
   */
  uploadImage(file: File, base64File: string): Observable<any> {
    const fileDTO = new FileDTO();
    fileDTO.size = file.size;
    fileDTO.type = file.type;
    fileDTO.user = this.us.getUser();
    fileDTO.base64File = base64File.split(',')[1];
    return this.http.post<any>(environment.apiUrl + '/files', fileDTO);
  }

  /**
   * Creates file reader and reads file
   * @param file chosen from file chooser
   */
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}

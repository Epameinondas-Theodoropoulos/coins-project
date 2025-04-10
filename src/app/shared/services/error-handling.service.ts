import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(
    private messageService: MessageService // private translate: TranslateService
  ) {}

  /*
   * HTTP Errors
   */
  showHttpResponseError(error: HttpErrorResponse): void {
    this.messageService.add({
      key: 'main-toast',
      severity: 'error',
      summary: 'Error',
      detail: this.httpErrorResponseToMessage(error),
    });
  }

  private httpErrorResponseToMessage(error: HttpErrorResponse): string {
    let translatedErrorMessage: any;
    if (error?.status === 404) {
      translatedErrorMessage = 'Error 404';
    } else if (error?.error?.message) {
      translatedErrorMessage = error?.error?.message;
    } else if (error?.message) {
      translatedErrorMessage = error?.message;
    } else {
      translatedErrorMessage = 'Timeout';
    }

    // Otherwise, use our default Unknown-Error message, along with the auto-generated error message
    return translatedErrorMessage ?? 'Unknown Error';
  }
}

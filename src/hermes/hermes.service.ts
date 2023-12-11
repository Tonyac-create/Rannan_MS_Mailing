import { Injectable } from '@nestjs/common';
const sgMail = require('@sendgrid/mail');

@Injectable()
export class HermesService {

  async sendMail(msg: any): Promise<any> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
}

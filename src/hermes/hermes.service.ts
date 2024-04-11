import { Injectable } from '@nestjs/common';
// import sgMail from '@sendgrid/mail';
import * as sgMail from '@sendgrid/mail';

import { config } from "dotenv"
import { join } from 'path';
config({ path: join(__dirname, '../../.env') })

@Injectable()
export class HermesService {

  async sendMail(msg: any): Promise<any> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error(error)
      if (error.response) {
        console.log("erreur venant du service nestjs hermes");
        console.error(error.response.body)
      }
    }
  }
}

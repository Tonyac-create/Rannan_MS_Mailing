import { Controller } from '@nestjs/common';
import { HermesService } from './hermes.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as fs from 'fs';

@Controller()
export class HermesController {
  constructor(private readonly hermesService: HermesService) {}

  @MessagePattern("validationMail")
  async registerMail(@Payload() data: {email: string, nickname: string, token: string}) {
  // Lire le contenu du fichier "resetTemplate.html"
    const templatePath = './src/hermes/template/registerTemplate.html';
    let templateContent = fs.readFileSync(templatePath, 'utf8');
  // Remplacer le marqueur de substitution par la valeur de 'url'
    console.log("URL :", `http://localhost:5173/mail/return/validation/${data.token}`)
    templateContent = templateContent.replace('{{URL_PLACEHOLDER}}', `http://localhost:5173/mail/return/validation/${data.token}`);
    templateContent = templateContent.replace('{{NICKNAME}}', data.nickname);
  // Créer l'objet de message pour SendGrid avec le contenu modifié du template
    const msg = {
      to: data.email,
      from: 'pilath.thomas@ikmail.com', // email vérifié sur le compte SendGrid
      subject: 'Validation de votre inscription sur le site Rannan.io',
      text: `Validation de votre inscription sur le site Rannan.io`,
      html: templateContent,
    };
    this.hermesService.sendMail(msg);
  }

@MessagePattern("resetMail")
  async resetMail(@Payload() data: {email: string, nickname: string, token: string}) {
  // Lire le contenu du fichier "resetTemplate.html"
    const templatePath = './src/hermes/template/resetTemplate.html';
    let templateContent = fs.readFileSync(templatePath, 'utf8');
  // Remplacer le marqueur de substitution par la valeur de 'url'
    console.log("URL :", `http://localhost:5173/mail/return/reset/${data.token}`)
    templateContent = templateContent.replace('{{URL_PLACEHOLDER}}', `http://localhost:5173/mail/return/reset/${data.token}`);
    templateContent = templateContent.replace('{{NICKNAME}}', data.nickname);
  // Créer l'objet de message pour SendGrid avec le contenu modifié du template
    const msg = {
      to: data.email,
      from: 'pilath.thomas@ikmail.com', // email vérifié sur le compte SendGrid
      subject: 'Demande de re initialisation du mot de passe',
      text: `Demande de re initialisation du mot de passe`,
      html: templateContent,
    };
    this.hermesService.sendMail(msg);
  }

}

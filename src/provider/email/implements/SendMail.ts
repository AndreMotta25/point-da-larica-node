import { createTransport, SendMailOptions } from 'nodemailer';
import hbs, { TemplateOptions } from 'nodemailer-express-handlebars';
import { Options } from 'nodemailer/lib/smtp-connection/index';
import { resolve } from 'path';

import { ISendMail } from '../ISendMail';

class SendMail implements ISendMail {
  private transporter;

  constructor() {
    const transportOptions: Options = {
      host: process.env.HOST,
      port: process.env.PORT_EMAIL ? Number(process.env.PORT_EMAIL) : 0,
      secure: Number(process.env.PORT_EMAIL) === 465,
      auth: {
        user: process.env.USER,
        pass: process.env.KEY,
      },
    };
    this.transporter = createTransport(transportOptions);

    // hadlebars
    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          layoutsDir: resolve('./src/views'),
          defaultLayout: false,
        },
        viewPath: resolve('./src/views'),
      })
    );

    this.transporter.verify((error, success) => {
      if (error) throw new Error('Credências de envio de email incorretas');
    });
  }

  async sendEmail(options: SendMailOptions & TemplateOptions) {
    const data: SendMailOptions & TemplateOptions = {
      ...options,
      from: {
        address: process.env.USER || 'Anonimous@email.com',
        name: process.env.NAME || 'Anonimous',
      },
      attachments: [
        { filename: 'logo.png', path: './images/logo.png', cid: 'logo' },
        ...(options.attachments || []),
      ],
    };
    await this.transporter.sendMail(data);
  }
}
export { SendMail };

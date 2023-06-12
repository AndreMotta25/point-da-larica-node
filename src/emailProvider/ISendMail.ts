import { SendMailOptions } from 'nodemailer';
import { TemplateOptions } from 'nodemailer-express-handlebars';

interface ISendMail {
  sendEmail(options: SendMailOptions & TemplateOptions): Promise<void>;
}
export { ISendMail };

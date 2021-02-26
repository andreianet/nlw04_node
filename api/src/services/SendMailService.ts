import nodemailer, { Transporter } from 'nodemailer';

import handlebars from "handlebars";
import fs from 'fs';

class SendMailService{
    //atributo
    private client: Transporter
    constructor(){
        nodemailer.createTestAccount().then((account) => {
            const transporter = nodemailer.createTransport(
                {
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    },
                    //Caso ocorrer o erro: self signed certificate in certificate  chain
                    tls: {
                        rejectUnauthorized: false
                    },
            });
            this.client = transporter;
        });
    }
    async execute(to:string, subject:string, variables:object, path: string){
        //leitura
        
        const templateFileContent = fs.readFileSync(path).toString("utf8");
        //compila o template
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variables)

        const message = await this.client.sendMail({
            to, 
            subject,
            html,
            from:"NPS <noreplay@nps.com.br>"
        })
        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
        
        
    }
}
export default new SendMailService()
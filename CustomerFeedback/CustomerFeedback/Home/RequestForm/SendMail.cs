using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Services;

namespace CustomerFeedback.RequestForm
{
    public class SendMail
    {
        public void send(string address, string subject, string message)
        {
            NetworkCredential cred = new NetworkCredential( "hr@99x.lk" , "admin@99x");
            MailMessage msg = new MailMessage();
            msg.To.Add(address);
            msg.From = new MailAddress("hr@99x.lk");
            msg.Subject = subject;
            msg.Body = message;
            SmtpClient client = new SmtpClient("mail.99xtechnology.com", 25);
            client.Credentials = cred; 
           // client.EnableSsl = true;  
            client.Send(msg);
            Console.WriteLine("Done");
        }
    }
}

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
            NetworkCredential cred = new NetworkCredential(System.Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress")
                , System.Environment.GetEnvironmentVariable("CustomerFeedbackMailPassword"));
            MailMessage msg = new MailMessage();
            msg.To.Add(address);
            msg.From = new MailAddress(System.Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress"));
            msg.Subject = subject;
            msg.Body = message;
            SmtpClient client = new SmtpClient("mail.99xtechnology.com", 25);
            client.Credentials = cred; 
            client.EnableSsl = true;  
            client.Send(msg);
            Console.WriteLine("Done");
        }
    }
}
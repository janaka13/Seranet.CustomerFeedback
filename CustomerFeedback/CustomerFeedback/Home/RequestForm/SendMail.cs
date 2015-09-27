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
                NetworkCredential cred = new NetworkCredential(System.Environment.GetEnvironmentVariable("CustomerFeedbackUserName"), System.Environment.GetEnvironmentVariable("CustomerFeedbackMailPassword"));

                MailMessage msg = new MailMessage();
                msg.To.Add(address);
                msg.From = new MailAddress(System.Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress"));
                msg.Subject = subject;
                msg.Body = message;

                SmtpClient client = new SmtpClient(System.Environment.GetEnvironmentVariable("EmailServerAddress"), 25);
                client.Credentials = cred;
                Console.WriteLine(" User Name :" + System.Environment.GetEnvironmentVariable("CustomerFeedbackUserName") + " Password : " + System.Environment.GetEnvironmentVariable("CustomerFeedbackMailPassword") + "  Email: " + System.Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress"));

                // client.EnableSsl = true;  
                client.Send(msg);
                Console.WriteLine("Done");
                
        }
    }
}

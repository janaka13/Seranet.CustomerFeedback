using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Services;
using System.Diagnostics;

namespace CustomerFeedback.RequestForm
{
    public class SendMail
    {
        public void send(string address, string subject, string message)
        {
           EventLog _myLog = new EventLog("Application", ".", "Customer Feedback");
            _myLog.WriteEntry("Email sending started");
            NetworkCredential cred = new NetworkCredential(System.Environment.GetEnvironmentVariable("CustomerFeedbackUserName")
                          , System.Environment.GetEnvironmentVariable("CustomerFeedbackMailPassword"));

            MailMessage msg = new MailMessage();
            msg.To.Add(address);
            msg.From = new MailAddress(System.Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress"));
            msg.Subject = subject;
            msg.Body = message;

            SmtpClient client = new SmtpClient(System.Environment.GetEnvironmentVariable("EmailServerAddress"), 25);
            client.Credentials = cred;
            Console.WriteLine(" User Name :" + System.Environment.GetEnvironmentVariable("CustomerFeedbackUserName") + " Password : " + System.Environment.GetEnvironmentVariable("CustomerFeedbackMailPassword") + "  Email: " + System.Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress"));
           _myLog.WriteEntry(" User Name :" + System.Environment.GetEnvironmentVariable("CustomerFeedbackUserName") + " Password : " + System.Environment.GetEnvironmentVariable("CustomerFeedbackMailPassword") + "  Email: " + System.Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress") + "Email Server :" + System.Environment.GetEnvironmentVariable("EmailServerAddress"));
          
            // client.EnableSsl = true;  
            client.Send(msg);
            Console.WriteLine("Done");
        }
    }
}

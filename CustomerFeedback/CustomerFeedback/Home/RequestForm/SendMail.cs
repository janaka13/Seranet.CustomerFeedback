using System;
using System.Net;
using System.Net.Mail;

namespace CustomerFeedback.RequestForm
{
    public class SendMail
    {
        public string UserName
        {
            get
            {
                return Environment.GetEnvironmentVariable("CustomerFeedbackUserName");
            }
        }

        public string UserPassword
        {
            get
            {
                return Environment.GetEnvironmentVariable("CustomerFeedbackMailPassword");
            }
        }

        public string UserMail
        {
            get
            {
                return Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress");
            }
        }

        public string EmailServer
        {
            get
            {
                return Environment.GetEnvironmentVariable("EmailServerAddress");
            }
        }

        public int EmailServerPort
        {
            get
            {
                var port = Environment.GetEnvironmentVariable("EmailServerPort");
                int portNumber;
                if (int.TryParse(port, out portNumber))
                {
                    return portNumber;
                }
                return 25;
            }
        }

        public void send(string address, string subject, string message)
        {
            NetworkCredential cred = new NetworkCredential(UserName, UserPassword);

            MailMessage msg = new MailMessage();
            msg.To.Add(address);
            msg.From = new MailAddress(UserMail);
            msg.Subject = subject;
            msg.Body = message;

            SmtpClient client = new SmtpClient(EmailServer, EmailServerPort);
            client.EnableSsl = true;
            client.Credentials = cred; 
            client.Send(msg);
        }
    }
}
